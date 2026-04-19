import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Smart Loan Analyzer — Free EMI Calculator';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage() {
  const fontData = await fetch(
    'https://fonts.gstatic.com/s/plusjakartasans/v8/LDIoaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_qU79Tg.woff'
  ).then((r) => r.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0f172a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 96px',
          fontFamily: '"PlusJakarta", sans-serif',
        }}
      >
        <div
          style={{
            color: '#60a5fa',
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: 3,
            marginBottom: 24,
            textTransform: 'uppercase',
          }}
        >
          Free · No signup required
        </div>
        <div
          style={{
            color: '#f8fafc',
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Smart Loan Analyzer
        </div>
        <div
          style={{
            color: '#94a3b8',
            fontSize: 30,
            marginBottom: 48,
          }}
        >
          EMI · Comparison · Affordability · Prepayment
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          {['EMI Calculator', 'Loan Comparison', 'Affordability Check', 'Prepayment Savings'].map(
            (label) => (
              <div
                key={label}
                style={{
                  background: '#1e3a5f',
                  border: '1px solid #2563eb',
                  borderRadius: 9999,
                  color: '#93c5fd',
                  fontSize: 20,
                  padding: '9px 20px',
                }}
              >
                {label}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: 'PlusJakarta', data: fontData, weight: 700 }] }
  );
}
