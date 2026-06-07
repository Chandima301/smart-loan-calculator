// ONE-TIME, run locally. Mints a long-lived refresh token for YOUR Google account.
//
//   1. In Google Cloud, create an OAuth client (type: Desktop app) and download its JSON.
//   2. Save that file next to this script as  oauth-client.json
//   3. npm install        (installs the dev dependency used here)
//   4. npm run token      -> opens a browser, you consent, it prints the refresh token.
//
// You do NOT deploy this script to the routine. It only exists to produce the token once.

import { authenticate } from '@google-cloud/local-auth';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

const client = await authenticate({
  keyfilePath: join(here, 'oauth-client.json'),
  scopes: [
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/webmasters.readonly',
  ],
});

const refreshToken = client.credentials.refresh_token;
if (!refreshToken) {
  console.error(
    '\nNo refresh token returned. This happens if you already granted the app before.\n' +
      'Revoke it at https://myaccount.google.com/permissions then run `npm run token` again.\n'
  );
  process.exit(1);
}

console.log('\n=== Copy these into your routine secrets ===\n');
console.log('GOOGLE_REFRESH_TOKEN=' + refreshToken);
console.log('\n(Also copy client_id and client_secret from oauth-client.json into');
console.log(' GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.)\n');
