/**
 * Netlify Function: advertiser-signup
 * Server-side advertiser account creation + custodial Solana wallet provisioning.
 *
 * POST /.netlify/functions/advertiser-signup
 * Body: { email, password, company_name, category, contact_email }
 *
 * FAITHFUL PORT NOTICE: the wallet-generation block below (generateAndEncryptWallet
 * + writeWalletToAdvertiser) is a deliberate, self-contained duplicate of the
 * canonical logic in the main app repo at lib/nsvx/walletProvisioning.ts
 * (provisionWallet(), holderType: "advertiser"). This function does NOT call
 * back into the main app's API — per explicit build instruction, agai-web must
 * be able to provision a wallet even if alphaglowai.app is unreachable, since
 * this is the one surface where financial/wallet UI is allowed to live.
 *
 * CONSEQUENCE OF THE DUPLICATION: any future security fix to the canonical
 * keypair-generation or KMS-encryption logic in walletProvisioning.ts (key
 * derivation, KMS key policy, encryption parameters, etc.) must be mirrored
 * here by hand. The two copies do not share code and will not stay in sync
 * automatically. Check this file whenever walletProvisioning.ts changes.
 *
 * Env vars required on THIS Netlify site (agai-web), matching the main app's
 * variable names so the same secret values can be reused without renaming.
 * Confirmed live and working (2026-08-23) on the staging branch-deploy
 * context, real signup + real KMS-encrypted wallet verified end-to-end
 * against the deployed function, not just locally:
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (already used by signup.js)
 *   KMS_KEY_ARN
 *   LAMBDA_INVOKER_ACCESS_KEY_ID / AWS_ACCESS_KEY_ID (fallback pair)
 *   LAMBDA_INVOKER_SECRET_ACCESS_KEY / AWS_SECRET_ACCESS_KEY (fallback pair)
 * AWS_REGION is NOT set as a Netlify env var here — attempts to set it
 * silently no-op (confirmed via two upsert calls + a re-read, neither took),
 * almost certainly because it's an AWS Lambda-reserved key name (Netlify
 * Functions run on Lambda under the hood, which auto-injects AWS_REGION
 * itself). Not a problem in practice: kmsClient() below already falls back
 * to "us-east-2" — the real region the KMS key lives in — when unset.
 *
 * Scope note (2026-08-23 build): wallets are created and left fully inactive.
 * on_chain_settlement_enabled stays false; no real or devnet transfer happens
 * here or anywhere else in this build. account_status defaults to 'pending' —
 * Petr flips it to 'approved' manually via direct SQL, same pattern already
 * used for NSVX promo grants. No approval workflow UI exists.
 */

const { KMSClient, EncryptCommand } = require('@aws-sdk/client-kms');
const { Keypair } = require('@solana/web3.js');

const SUPABASE_URL =
  process.env.SUPABASE_URL || 'https://ykyiylphnpainoquefic.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

/** POST /auth/v1/admin/users — creates a Supabase auth user server-side */
async function createSupabaseUser(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      email_confirm: true,
      user_metadata: { account_type: 'advertiser' },
    }),
  });
  return res.json();
}

/** POST advertisers — creates the advertiser row, returns it (need the new id) */
async function createAdvertiserRow(userId, companyName, category, contactEmail) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/advertisers`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      user_id: userId,
      company_name: companyName,
      category,
      contact_email: contactEmail,
      // account_status and status both default to 'pending' at the DB level —
      // not set explicitly here so a future default change isn't silently
      // overridden by this function.
    }),
  });
  const rows = await res.json();
  return Array.isArray(rows) ? rows[0] : rows;
}

/**
 * FAITHFUL PORT of lib/nsvx/walletProvisioning.ts's keypair-generation +
 * KMS-encryption block. See the file-level doc comment above for the
 * drift-risk this duplication carries.
 */
function kmsClient() {
  const accessKeyId =
    process.env.LAMBDA_INVOKER_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey =
    process.env.LAMBDA_INVOKER_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) {
    throw new Error('AWS credentials not configured for KMS');
  }

  return new KMSClient({
    region: process.env.AWS_REGION || 'us-east-2',
    credentials: { accessKeyId, secretAccessKey },
  });
}

/** Generates a keypair and encrypts the private key via KMS. Mirrors provisionWallet(). */
async function generateAndEncryptWallet() {
  const keypair = Keypair.generate();
  const walletAddress = keypair.publicKey.toBase58();
  const secretKeyBytes = Buffer.from(keypair.secretKey);

  const kms = kmsClient();
  const result = await kms.send(
    new EncryptCommand({
      KeyId: process.env.KMS_KEY_ARN,
      Plaintext: secretKeyBytes,
    })
  );
  if (!result.CiphertextBlob) throw new Error('KMS returned empty CiphertextBlob');
  const encryptedKeyBuffer = Buffer.from(result.CiphertextBlob);

  return { walletAddress, encryptedKeyHex: encryptedKeyBuffer.toString('hex') };
}

/** Writes the generated wallet to the advertiser's row. Mirrors provisionWallet(). */
async function writeWalletToAdvertiser(advertiserId, walletAddress, encryptedKeyHex) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/advertisers?id=eq.${advertiserId}`, {
    method: 'PATCH',
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      solana_wallet_address: walletAddress,
      // bytea columns accept \\x-prefixed hex — Supabase/pg handles the cast
      wallet_private_key_encrypted: `\\x${encryptedKeyHex}`,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to write wallet to advertisers.id=${advertiserId}: ${text}`);
  }
}

/** Sign in to get a Supabase session (access_token + refresh_token). */
async function signInForSession(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  let email, password, company_name, category, contact_email;
  try {
    ({ email, password, company_name, category, contact_email } = JSON.parse(event.body || '{}'));
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Invalid request body' }),
    };
  }

  if (!email || !password || !company_name || !category || !contact_email) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: 'email, password, company_name, category, and contact_email are required',
      }),
    };
  }

  if (password.length < 6) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Password must be at least 6 characters' }),
    };
  }

  // 1. Create Supabase auth user (server-side — service key stays here)
  console.log(`[advertiser-signup] Creating Supabase user for ${email}`);
  const userData = await createSupabaseUser(email, password);

  if (!userData.id) {
    const msg =
      userData.message ||
      userData.error_description ||
      userData.error ||
      'Failed to create account';
    console.error('[advertiser-signup] Supabase user creation failed:', msg);
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: msg }),
    };
  }

  const userId = userData.id;
  console.log(`[advertiser-signup] Supabase user created: ${userId}`);

  // 2. Create the advertisers row
  let advertiser;
  try {
    advertiser = await createAdvertiserRow(userId, company_name, category, contact_email);
    if (!advertiser || !advertiser.id) {
      throw new Error(`No advertiser row returned: ${JSON.stringify(advertiser)}`);
    }
    console.log(`[advertiser-signup] Advertiser row created: ${advertiser.id}`);
  } catch (err) {
    // Unlike wallet creation below, a failed advertiser row means the account
    // has no usable business record — this is fatal, not best-effort.
    console.error('[advertiser-signup] Advertiser row creation failed:', err.message);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Failed to create advertiser account record' }),
    };
  }

  // 3. Provision the custodial wallet (best-effort — account + advertiser row
  // already exist either way; a missing wallet can be backfilled later by
  // re-running this same generate+encrypt+write block server-side).
  try {
    console.log(`[advertiser-signup] Provisioning wallet for advertiser ${advertiser.id}`);
    const { walletAddress, encryptedKeyHex } = await generateAndEncryptWallet();
    await writeWalletToAdvertiser(advertiser.id, walletAddress, encryptedKeyHex);
    console.log(`[advertiser-signup] Wallet provisioned: ${walletAddress}`);
  } catch (err) {
    console.error('[advertiser-signup] Wallet provisioning failed:', err.message);
  }

  // 4. Sign in to get session tokens for the agai-web dashboard's own client.
  let access_token = null;
  let refresh_token = null;
  try {
    const session = await signInForSession(email, password);
    access_token = session.access_token || null;
    refresh_token = session.refresh_token || null;
    if (!access_token) {
      console.warn('[advertiser-signup] signIn returned no access_token:', JSON.stringify(session));
    }
  } catch (err) {
    console.error('[advertiser-signup] signIn error:', err.message);
  }

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      success: true,
      userId,
      advertiserId: advertiser.id,
      access_token,
      refresh_token,
    }),
  };
};
