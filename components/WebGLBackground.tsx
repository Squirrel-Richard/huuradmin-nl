'use client'

// Lightweight CSS-based background — replaces old Three.js/WebGL implementation
// Stars are rendered in each page individually for optimal performance
export default function WebGLBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      {Array.from({ length: 60 }, (_, i) => {
        const x = ((i * 137.5) % 100)
        const y = ((i * 97.3) % 100)
        const size = (i % 3) * 0.6 + 0.5
        const duration = (i % 4) + 2
        const delay = (i % 5) * 0.8

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              background: 'white',
              opacity: 0.15 + (i % 5) * 0.06,
              animation: `twinkle ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        )
      })}
    </div>
  )
}
