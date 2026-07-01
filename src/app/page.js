'use client'
import { useState, useEffect } from 'react';
import { tmdb } from '../lib/tmdb';

export default function Home() {
  const [content, setContent] = useState({ trending: [], popular: [] });
  const [featured, setFeatured] = useState(null);
  const [play, setPlay] = useState(null);

  useEffect(() => {
    async function load() {
      const trending = await tmdb.getTrending();
      const popular = await tmdb.getPopularMovies();
      setContent({ trending, popular });
      setFeatured(trending[0]);
    }
    load();
  }, []);

  return (
    <main>
      {/* Banner */}
      {featured && (
        <div style={{ height: '80vh', position: 'relative', background: `url(${tmdb.imageFull(featured.backdrop_path)}) center/cover` }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, #0a0a0a, transparent)' }} />
          <div style={{ position: 'absolute', bottom: '10%', left: '5%' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{featured.title || featured.name}</h1>
            <button className="btn-gold" onClick={() => setPlay(featured)}>▶ ASSISTIR TRAILER</button>
          </div>
        </div>
      )}

      {/* Fileiras */}
      <section style={{ padding: '20px' }}>
        <h2 className="gold-gradient">🔥 EM ALTA</h2>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '10px 0' }}>
          {content.trending.map(m => (
            <img key={m.id} src={tmdb.image(m.poster_path)} style={{ width: '150px', borderRadius: '8px' }} />
          ))}
        </div>
      </section>

      {/* Player Modal */}
      {play && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button style={{ position: 'absolute', top: 20, right: 20, color: 'gold' }} onClick={() => setPlay(null)}>FECHAR X</button>
          <h2 style={{color: 'white'}}>Abriremos o Trailer de: {play.title}</h2>
        </div>
      )}
    </main>
  );
}
