const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/500x750?text=No+Image";

export const fetchMovies = async ({ search, category }) => {
  let url = `https://api.themoviedb.org/3`;
  if (search) {
    url += `/search/movie?api_key=${API_KEY}&sort_by=popularity.desc&query=${search}`;
  } else {
    url += `/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
  }
  if (category) {
    url += `&with_genres=${category}`;
  }
  const res = await fetch(url);
  const json = await res.json();
  return json.results.map((movie) => ({
    ...movie,
    imageUrl: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : PLACEHOLDER_IMAGE,
  }));
};

export const fetchMovieDetails = async (id) => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => ({
      ...data,
      imageUrl: data.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : PLACEHOLDER_IMAGE,
      backdropUrl: data.backdrop_path
        ? `https://www.themoviedb.org/t/p/w1000_and_h450_multi_faces${data.backdrop_path}`
        : PLACEHOLDER_IMAGE,
      releaseYear: data.release_date.split("-")[0],
    }))
    .catch((error) => console.error(error));
};

const api = {
  fetchMovies,
  fetchMovieDetails,
};

export default api;
