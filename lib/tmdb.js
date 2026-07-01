const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY
const BASE = 'https://api.themoviedb.org/3'
const IMG = 'https://image.tmdb.org/t/p'

async function get(url) {
  try {
    const res = await fetch(url)
    const data = await res.json()
    return data.results || []
  } catch (e) {
    return []
  }
}

export const tmdb = {
  img: (path, size) => path ? IMG + '/' + (size || 'w500') + path : null,
  imgFull: (path) => path ? IMG + '/original' + path : null,

  trending: () => get(BASE + '/trending/all/day?api_key=' + API_KEY + '&language=pt-BR'),
  popularMovies: () => get(BASE + '/movie/popular?api_key=' + API_KEY + '&language=pt-BR'),
  topMovies: () => get(BASE + '/movie/top_rated?api_key=' + API_KEY + '&language=pt-BR'),
  actionMovies: () => get(BASE + '/discover/movie?api_key=' + API_KEY + '&language=pt-BR&with_genres=28'),
  nowPlaying: () => get(BASE + '/movie/now_playing?api_key=' + API_KEY + '&language=pt-BR'),
  popularSeries: () => get(BASE + '/tv/popular?api_key=' + API_KEY + '&language=pt-BR'),
  topSeries: () => get(BASE + '/tv/top_rated?api_key=' + API_KEY + '&language=pt-BR'),

  trailer: async (id, type) => {
    try {
      const res = await fetch(BASE + '/' + (type || 'movie') + '/' + id + '/videos?api_key=' + API_KEY + '&language=pt-BR')
      const data = await res.json()
      var t = null
      if (data.results) {
        for (var i = 0; i < data.results.length; i++) {
          if (data.results[i].type === 'Trailer' && data.results[i].site === 'YouTube') {
            t = data.results[i]
            break
          }
        }
        if (!t && data.results.length > 0) t = data.results[0]
      }
      if (!t) {
        const res2 = await fetch(BASE + '/' + (type || 'movie') + '/' + id + '/videos?api_key=' + API_KEY)
        const data2 = await res2.json()
        if (data2.results) {
          for (var j = 0; j < data2.results.length; j++) {
            if (data2.results[j].type === 'Trailer' && data2.results[j].site === 'YouTube') {
              t = data2.results[j]
              break
            }
          }
          if (!t && data2.results.length > 0) t = data2.results[0]
        }
      }
      return t
    } catch (e) {
      return null
    }
  }
}
