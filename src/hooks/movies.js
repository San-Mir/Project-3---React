import { useEffect, useState } from "react";
import { api } from "../services";

export const useMovies = ({ search, category } = {}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const movies = await api.fetchMovies({ search, category });
      setMovies(movies);
      setLoading(false);
    };
    fetchMovies();
  }, [search, category]);
  return [movies, loading];
};

export const useMovie = (id) => {
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      const movie = await api.fetchMovieDetails(id);
      setMovie(movie);
      setLoading(false);
      if (!movie) {
        setError("Movie not found");
      }
    };
    fetchMovie();
  }, [id]);
  return [movie, loading, error];
};
