/**
 * End-to-end verification for agai-web signup + Crossmint wallet creation.
 *
 * 1. Calls /.netlify/functions/signup on staging with a fresh test user
 * 2. Polls profiles.wallet_address in Supabase to confirm it was populated
 * 3. Cleans up the test user
 *
 * Usage:
 *   SUPABASE_SERVICE_KEY=<service_key> SUPABASE_PAT=<pat> node scripts/verify-signup-staging.mjs
 */

const STAGING_BASE = 'https://staging--agai-web.netlify.app';
const SUPABASE_URL = 'https://ykyiylphnpainoquefic.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const SUPABASE_PAT = process.env.SUPABASE_PAT;

if (!SUPABASE_SERVICE_KEY || !SUPABASE_PAT) {
  console.error('Missing required env vars: SUPABASE_SERVICE_KEY, SUPABASE_PAT');
  process.exit(1);
}

const ts = Date.now();
const testEmail = `web-signup-test-${ts}@alphaglow-verify.dev`;
const testPassword = 'TestWebSignup123!';
const testUsername = `wsignup${ts}`.slice(0, 20);

async function supabaseQuery(sql) {
  const res = await fetch(
    'https://api.supabase.com/v1/projects/ykyiylphnpainoquefic/database/query',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SUPABASE_PAT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: sql }),
    }
  );
  return res.json();
}

async function run() {
  console.log('\n=== agai-web Signup + Wallet Integration — Staging Verification ===\n');
  console.log('Staging  :', STAGING_BASE);
  console.log('Email    :', testEmail);
  console.log('Username :', testUsername);
  console.log();

  // ── Step 1: POST to /.netlify/functions/signup ─────────────────────
  console.log('1. Calling /.netlify/functions/signup …');
  const signupRes = await fetch(`${STAGING_BASE}/.netlify/functions/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testEmail,
      password: testPassword,
      username: testUsername,
    }),
  });

  const signupData = await signupRes.json();
  console.log('   HTTP status :', signupRes.status);
  console.log('   Response    :', JSON.stringify(signupData));

  if (!signupRes.ok || !signupData.success) {
    console.error('\nFAIL: signup function returned error');
    process.exit(1);
  }

  const userId = signupData.userId;
  console.log('   user_id     :', userId);

  // ── Step 2: Poll profiles.wallet_address ───────────────────────────
  console.log('\n2. Polling profiles.wallet_address (up to 30s) …');
  let walletAddress = null;
  for (let attempt = 1; attempt <= 10; attempt++) {
    await new Promise((r) => setTimeout(r, 3000));
    const rows = await supabaseQuery(
      `SELECT wallet_address FROM profiles WHERE user_id = '${userId}' LIMIT 1`
    );
    walletAddress = rows[0]?.wallet_address ?? null;
    if (walletAddress) {
      console.log(`   Found on attempt ${attempt}: ${walletAddress}`);
      break;
    }
    console.log(`   Attempt ${attempt}/10: wallet_address = null — retrying …`);
  }

  // ── Step 3: Result ─────────────────────────────────────────────────
  console.log('\n=== RESULT ===');
  if (walletAddress) {
    console.log('PASS  profiles.wallet_address =', walletAddress);
    console.log('      user_id                 =', userId);
  } else {
    console.log('FAIL  wallet_address still null after 30s');
    console.log('      Check Netlify function logs for [signup] errors.');
  }

  // ── Step 4: Cleanup ────────────────────────────────────────────────
  console.log('\nCleaning up test user …');
  await supabaseQuery(`DELETE FROM auth.users WHERE id = '${userId}'`);
  console.log('Done.\n');

  if (!walletAddress) process.exit(1);
}

run().catch((e) => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
