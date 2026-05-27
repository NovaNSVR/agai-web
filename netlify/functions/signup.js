/**
 * Netlify Function: signup
 * Handles server-side account creation + Crossmint Solana smart wallet setup.
 *
 * POST /.netlify/functions/signup
 * Body: { email: string, password: string, username: string }
 *
 * This function runs entirely server-side — the Crossmint API key and
 * Supabase service role key are NEVER exposed to the client.
 *
 * Architecture note: All crypto/wallet operations live on alphaglowai.com
 * (the website) and never inside the mobile app — required for App Store
 * and Google Play Store compliance.
 */

const SUPABASE_URL =
  process.env.SUPABASE_URL || 'https://ykyiylphnpainoquefic.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const CROSSMINT_API_KEY = process.env.CROSSMINT_API_KEY;

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

/** POST /auth/v1/admin/users — creates a Supabase auth user server-side */
async function createSupabaseUser(email, password, username) {
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
      user_metadata: { username },
    }),
  });
  return res.json();
}

/** PATCH profiles.username for the newly created user */
async function setUsername(userId, username) {
  await fetch(`${SUPABASE_URL}/rest/v1/profiles?user_id=eq.${userId}`, {
    method: 'PATCH',
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ username }),
  });
}

/** POST to Crossmint 2025-06-09 API to create a Solana smart wallet */
async function createCrossmintWallet(email, userId) {
  const res = await fetch('https://www.crossmint.com/api/2025-06-09/wallets', {
    method: 'POST',
    headers: {
      'X-API-KEY': CROSSMINT_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chainType: 'solana',
      type: 'smart',
      config: {
        adminSigner: { type: 'email', email },
      },
      owner: `userId:${userId}`,
    }),
  });
  return res.json();
}

/** Store the wallet address in profiles.wallet_address */
async function storeWalletAddress(userId, walletAddress) {
  await fetch(`${SUPABASE_URL}/rest/v1/profiles?user_id=eq.${userId}`, {
    method: 'PATCH',
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({ wallet_address: walletAddress }),
  });
}

/**
 * Sign in to get a Supabase session (access_token + refresh_token).
 * Uses the password grant flow — runs server-side so keys stay secret.
 */
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
  // Handle CORS preflight
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

  // Parse and validate request body
  let email, password, username;
  try {
    ({ email, password, username } = JSON.parse(event.body || '{}'));
  } catch {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Invalid request body' }),
    };
  }

  if (!email || !password || !username) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'email, password, and username are required' }),
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
  console.log(`[signup] Creating Supabase user for ${email}`);
  const userData = await createSupabaseUser(email, password, username);

  if (!userData.id) {
    const msg =
      userData.message ||
      userData.error_description ||
      userData.error ||
      'Failed to create account';
    console.error('[signup] Supabase user creation failed:', msg);
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: msg }),
    };
  }

  const userId = userData.id;
  console.log(`[signup] Supabase user created: ${userId}`);

  // 2. Wait for the DB trigger to create the profiles row
  await new Promise((r) => setTimeout(r, 800));

  // 3. Set username in profiles
  await setUsername(userId, username);
  console.log(`[signup] Username set: ${username}`);

  // 4. Create Crossmint Solana smart wallet (server-side — API key stays here)
  let walletAddress = null;
  try {
    console.log(`[signup] Creating Crossmint wallet for userId:${userId}`);
    const walletData = await createCrossmintWallet(email, userId);
    walletAddress = walletData.address || null;

    if (walletAddress) {
      // 5. Persist wallet address to profiles
      await storeWalletAddress(userId, walletAddress);
      console.log(`[signup] Wallet stored: ${walletAddress}`);
    } else {
      console.warn('[signup] Crossmint returned no address:', JSON.stringify(walletData));
    }
  } catch (err) {
    // Wallet creation failure is non-fatal — account exists, wallet retry later
    console.error('[signup] Crossmint error:', err.message);
  }

  // 6. Sign in to get session tokens for the cross-domain redirect
  // The app's /auth/callback will consume these to create a Supabase session.
  let access_token = null;
  let refresh_token = null;
  try {
    const session = await signInForSession(email, password);
    access_token = session.access_token || null;
    refresh_token = session.refresh_token || null;
    if (access_token) {
      console.log(`[signup] Session tokens obtained for redirect`);
    } else {
      console.warn('[signup] signIn returned no access_token:', JSON.stringify(session));
    }
  } catch (err) {
    console.error('[signup] signIn error:', err.message);
  }

  return {
    statusCode: 200,
    headers: CORS_HEADERS,
    body: JSON.stringify({ success: true, userId, access_token, refresh_token }),
  };
};
