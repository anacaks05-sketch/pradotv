'use client'

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{
        fontSize: '60px',
        background: 'linear-gradient(135deg, #FFD700, #B8860B)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: '900',
        letterSpacing: '5px'
      }}>
        PRADO TV
      </h1>
      <p style={{ color: '#888', marginTop: '10px', letterSpacing: '3px' }}>
        ENTRETENIMENTO PREMIUM
      </p>
      <p style={{ color: '#FFD700', marginTop: '40px' }}>
        🚀 Site no ar com sucesso!
      </p>
    </main>
  )
}
