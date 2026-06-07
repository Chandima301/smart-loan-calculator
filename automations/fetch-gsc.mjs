import { google } from 'googleapis';
import { mkdirSync, writeFileSync } from 'node:fs';

const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);
auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

// This site is verified as a Domain property: "sc-domain:smartloanalyzer.com"
// (URL-prefix form "https://smartloanalyzer.com/" is NOT owned and returns 403.)
const siteUrl = process.env.GSC_SITE_URL;
const searchconsole = google.searchconsole({ version: 'v1', auth });

const day = 864e5;
const endDate = new Date(Date.now() - 2 * day).toISOString().slice(0, 10); // GSC lags ~2 days
const startDate = new Date(Date.now() - 30 * day).toISOString().slice(0, 10);

async function query(dimensions, rowLimit = 200) {
  const { data } = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: { startDate, endDate, dimensions, rowLimit, dataState: 'final' },
  });
  return (data.rows ?? []).map((r) => ({
    key: r.keys.join(' | '),
    clicks: r.clicks,
    impressions: r.impressions,
    ctr: +(r.ctr * 100).toFixed(2),
    position: +r.position.toFixed(1),
  }));
}

const [queries, pages] = await Promise.all([query(['query'], 250), query(['page'], 100)]);

// Opportunity buckets the routine reasons over.
const highImpLowCtr = queries
  .filter((q) => q.impressions >= 100 && q.ctr < 2)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 20);
const strikingDistance = queries
  .filter((q) => q.position > 5 && q.position <= 15)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 20);

mkdirSync('out', { recursive: true });
writeFileSync(
  'out/gsc.json',
  JSON.stringify({ startDate, endDate, topQueries: queries.slice(0, 50), topPages: pages, highImpLowCtr, strikingDistance }, null, 2)
);
console.log(`GSC ok: ${queries.length} queries, ${pages.length} pages -> out/gsc.json`);
