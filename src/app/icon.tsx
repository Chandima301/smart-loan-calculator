import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 512,
          height: 512,
          borderRadius: 96,
          background: '#0f172a',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: 80,
          paddingLeft: 72,
          paddingRight: 72,
          gap: 36,
        }}
      >
        <div style={{ width: 80, height: 280, background: '#3b82f6', borderRadius: 14 }} />
        <div style={{ width: 80, height: 192, background: '#60a5fa', borderRadius: 14 }} />
        <div style={{ width: 80, height: 112, background: '#93c5fd', borderRadius: 14 }} />
      </div>
    ),
    { ...size }
  );
}
