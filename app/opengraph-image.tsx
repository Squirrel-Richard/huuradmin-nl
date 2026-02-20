import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'HuurAdmin NL — Verhuur beheren zonder zorgen'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#030810',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Blue glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '400px',
            background: 'radial-gradient(ellipse, rgba(77,184,255,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            background: 'rgba(77,184,255,0.15)',
            borderRadius: '20px',
            border: '1px solid rgba(77,184,255,0.3)',
            marginBottom: '28px',
            fontSize: '40px',
          }}
        >
          🏠
        </div>

        {/* Product name */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 900,
            color: '#dde8f5',
            letterSpacing: '-3px',
            marginBottom: '12px',
            textAlign: 'center',
            lineHeight: 1.05,
          }}
        >
          HuurAdmin NL
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '26px',
            color: '#4db8ff',
            textAlign: 'center',
            marginBottom: '16px',
            fontWeight: 600,
          }}
        >
          Verhuur beheren zonder zorgen
        </div>

        <div
          style={{
            fontSize: '18px',
            color: 'rgba(221,232,245,0.45)',
            textAlign: 'center',
            maxWidth: '700px',
          }}
        >
          Compliant met Betaalbare Huurwet 2024 · Huurprijscheck · WhatsApp reminders · PDF jaaroverzicht
        </div>

        {/* Bottom row */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '80px',
            right: '80px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: '16px' }}>
            {['Huurwet 2024', 'iDEAL', 'WhatsApp reminders'].map(tag => (
              <div
                key={tag}
                style={{
                  background: 'rgba(77,184,255,0.1)',
                  border: '1px solid rgba(77,184,255,0.25)',
                  borderRadius: '100px',
                  padding: '6px 16px',
                  color: '#4db8ff',
                  fontSize: '15px',
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ color: 'rgba(221,232,245,0.2)', fontSize: '14px' }}>AIOW BV</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
