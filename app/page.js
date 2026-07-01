'use client'
import { useState, useEffect } from 'react'
import { tmdb } from '../lib/tmdb'

export default function Home() {
  const [data, setData] = useState(null)
  const [feat, setFeat] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(function () {
    async function load() {
      var trending = await tmdb.trending()
      var popular = await tmdb.popularMovies()
      var top = await tmdb.topMovies()
      var action = await tmdb.actionMovies()
      var series = await tmdb.popularSeries()
      var topS = await tmdb.topSeries()
      var now = await tmdb.nowPlaying()

      setData({
        trending: trending,
        popular: popular,
        top: top,
        action: action,
        series: series,
        topSeries: topS,
        now: now
      })

      if (trending.length > 0) {
        var valid = []
        for (var i = 0; i < trending.length; i++) {
          if (trending[i].backdrop_path && trending[i].overview) {
            valid.push(trending[i])
          }
        }
        if (valid.length > 0) {
          setFeat(valid[Math.floor(Math.random() * Math.min(5, valid.length))])
        }
      }

      setLoading(false)
    }
    load()
  }, [])

  async function playTrailer(item) {
    var type = item.media_type === 'tv' || item.first_air_date ? 'tv' : 'movie'
    var t = await tmdb.trailer(item.id, type)
    if (t && t.key) {
      setTrailer({ key: t.key, title: item.title || item.name })
    } else {
      alert('Trailer não disponível para: ' + (item.title || item.name))
    }
  }

  if (loading) {
    return (
      <main style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '900',
          letterSpacing: '4px',
          background: 'linear-gradient(135deg, #FFD700, #B8860B)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>PRADO TV</h1>
        <p style={{ color: '#888', marginTop: '8px', letterSpacing: '3px', fontSize: '13px' }}>
          ENTRETENIMENTO PREMIUM
        </p>
        <div style={{
          marginTop: '40px',
          width: '40px',
          height: '40px',
          border: '4px solid rgba(255,215,0,0.2)',
          borderTop: '4px solid #FFD700',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
      </main>
    )
  }

  var categories = [
    { name: '🔥 Em Alta Hoje', items: data.trending },
    { name: '🎬 Filmes Populares', items: data.popular },
    { name: '🏆 Mais Bem Avaliados', items: data.top },
    { name: '💥 Ação', items: data.action },
    { name: '🎥 Em Cartaz', items: data.now },
    { name: '📺 Séries Populares', items: data.series },
    { name: '⭐ Séries Top', items: data.topSeries }
  ]

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.95), transparent)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: '900',
          letterSpacing: '3px',
          background: 'linear-gradient(135deg, #FFD700, #B8860B)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>PRADO TV</div>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFD700, #B8860B)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          color: '#000',
          fontSize: '16px'
        }}>P</div>
      </nav>

      {/* BANNER */}
      {feat && (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '85vh',
          minHeight: '500px',
          overflow: 'hidden'
        }}>
          <img
            src={tmdb.imgFull(feat.backdrop_path)}
            alt={feat.title || feat.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(0deg, #0a0a0a 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.2) 100%)'
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(10,10,10,0.9) 0%, transparent 60%)'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '80px',
            left: '30px',
            maxWidth: '500px'
          }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #FFD700, #B8860B)',
              color: '#000',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '800',
              letterSpacing: '2px',
              marginBottom: '14px'
            }}>EM DESTAQUE</div>
            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 56px)',
              fontWeight: '900',
              lineHeight: '1.1',
              marginBottom: '12px'
            }}>{feat.title || feat.name}</h1>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ color: '#FFD700', fontWeight: '800' }}>⭐ {feat.vote_average && feat.vote_average.toFixed(1)}</span>
              <span style={{ color: '#aaa', fontSize: '14px' }}>{(feat.release_date || feat.first_air_date || '').slice(0, 4)}</span>
            </div>
            <p style={{
              color: '#ccc',
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '24px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>{feat.overview}</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-gold" onClick={function () { playTrailer(feat) }}>▶ Assistir Trailer</button>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORIAS */}
      <div style={{ paddingTop: '30px', paddingBottom: '80px' }}>
        {categories.map(function (cat, idx) {
          if (!cat.items || cat.items.length === 0) return null
          return (
            <div key={idx} style={{ marginBottom: '40px' }}>
              <h2 className="section-title">{cat.name}</h2>
              <div className="row-scroll">
                {cat.items.map(function (item) {
                  return (
                    <div key={item.id} className="card" onClick={function () { playTrailer(item) }}>
                      <img
                        src={tmdb.img(item.poster_path, 'w342')}
                        alt={item.title || item.name}
                        onError={function (e) { e.target.src = 'https://via.placeholder.com/150x225/1a1a1a/FFD700?text=Prado+TV' }}
                      />
                      {item.vote_average > 0 && (
                        <div className="card-rating">⭐ {item.vote_average.toFixed(1)}</div>
                      )}
                      <div className="card-overlay">
                        <div className="card-title">{item.title || item.name}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid rgba(255,215,0,0.15)',
        padding: '40px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: '900',
          letterSpacing: '4px',
          background: 'linear-gradient(135deg, #FFD700, #B8860B)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px'
        }}>PRADO TV</div>
        <p style={{ color: '#444', fontSize: '12px' }}>© 2024 Prado TV — Entretenimento Premium</p>
      </footer>

      {/* PLAYER TRAILER */}
      {trailer && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.97)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '900px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div>
              <div style={{ fontSize: '11px', color: '#FFD700', letterSpacing: '3px', fontWeight: '700' }}>PRADO TV</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>{trailer.title}</div>
            </div>
            <button onClick={function () { setTrailer(null) }} style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,215,0,0.3)',
              color: '#FFD700',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '20px'
            }}>✕</button>
          </div>
          <div style={{
            width: '100%',
            maxWidth: '900px',
            aspectRatio: '16/9',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '2px solid rgba(255,215,0,0.25)',
            boxShadow: '0 0 60px rgba(255,215,0,0.1)'
          }}>
            <iframe
              src={'https://www.youtube.com/embed/' + trailer.key + '?autoplay=1&rel=0'}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen"
              style={{ display: 'block' }}
            />
          </div>
        </div>
      )}
    </main>
  )
}
