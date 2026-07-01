const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p';

export const tmdb = {
  image: (path) => path ? `${IMAGE_URL}/w500${path}` : null,
  imageFull: (path) => path ? `${IMAGE_URL}/original${path}` : null,

  async fetch(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}&language=pt-BR`);
    const data = await res.json();
    return data.results || [];
  },

  getTrending: () => tmdb.fetch('/trending/all/day'),
  getPopularMovies: () => tmdb.fetch('/movie/popular'),
  getTopRatedMovies: () => tmdb.fetch('/movie/top_rated'),
  getPopularSeries: () => tmdb.fetch('/tv/popular'),
  getMovieTrailer: async (id) => {
    const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=pt-BR`);
    const data = await res.json();
    return data.results?.find(v => v.type === 'Trailer') || data.results?.[0];
  }
};
