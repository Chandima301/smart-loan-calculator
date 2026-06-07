import { google } from 'googleapis';
import { mkdirSync, writeFileSync } from 'node:fs';

// OAuth as your own Google account, which already has access to the property.
const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);
auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const analyticsdata = google.analyticsdata({ version: 'v1beta', auth });
const property = `properties/${process.env.GA4_PROPERTY_ID}`; // numeric ID, e.g. 123456789

async function report({ dimensions, metrics, dateRange, limit = 25, orderByMetric }) {
  const { data } = await analyticsdata.properties.runReport({
    property,
    requestBody: {
      dateRanges: [dateRange],
      dimensions: dimensions.map((name) => ({ name })),
      metrics: metrics.map((name) => ({ name })),
      limit: String(limit),
      ...(orderByMetric
        ? { orderBys: [{ metric: { metricName: orderByMetric }, desc: true }] }
        : {}),
    },
  });
  return (data.rows ?? []).map((row) => {
    const out = {};
    row.dimensionValues.forEach((v, i) => (out[dimensions[i]] = v.value));
    row.metricValues.forEach((v, i) => (out[metrics[i]] = Number(v.value)));
    return out;
  });
}

const current = { startDate: '28daysAgo', endDate: 'yesterday' };
const previous = { startDate: '56daysAgo', endDate: '29daysAgo' };
const pageMetrics = ['screenPageViews', 'engagementRate', 'keyEvents', 'averageSessionDuration'];

const [pagesNow, pagesPrev, channels, devices] = await Promise.all([
  report({ dimensions: ['pagePath'], metrics: pageMetrics, dateRange: current, limit: 25, orderByMetric: 'screenPageViews' }),
  report({ dimensions: ['pagePath'], metrics: pageMetrics, dateRange: previous, limit: 100, orderByMetric: 'screenPageViews' }),
  report({ dimensions: ['sessionDefaultChannelGroup'], metrics: ['sessions', 'keyEvents'], dateRange: current, limit: 15, orderByMetric: 'sessions' }),
  report({ dimensions: ['deviceCategory'], metrics: ['sessions', 'engagementRate', 'keyEvents'], dateRange: current, limit: 5 }),
]);

// Join current vs previous on pagePath to compute view deltas.
const prevByPath = Object.fromEntries(pagesPrev.map((p) => [p.pagePath, p]));
const pages = pagesNow.map((p) => {
  const prev = prevByPath[p.pagePath];
  const viewsDeltaPct =
    prev && prev.screenPageViews
      ? Math.round(((p.screenPageViews - prev.screenPageViews) / prev.screenPageViews) * 100)
      : null;
  return { ...p, engagementRate: +(p.engagementRate * 100).toFixed(1), viewsDeltaPct };
});

mkdirSync('out', { recursive: true });
writeFileSync('out/ga.json', JSON.stringify({ window: current, pages, channels, devices }, null, 2));
console.log(`GA ok: ${pages.length} pages, ${channels.length} channels -> out/ga.json`);
