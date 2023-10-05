import { Link } from "react-router-dom";
import { useMovies } from "../../hooks";
import Loader from "../Loader";

export const MovieList = () => {
  const [movies, loading] = useMovies();
  return (
    <div className="flex flex-wrap justify-center items-center grow relative">
      {loading ? (
        <Loader />
      ) : movies.length > 0 ? (
        movies.map(({ title, imageUrl, id }) => (
          <div key={id} className="w-[300px] p-4">
            <Link to={`/details/${id}`}>
              <div className="rounded-lg overflow-hidden hover:shadow-xl relative">
                <img
                  className="w-full h-[450px] object-cover"
                  src={imageUrl}
                  alt={title}
                />
                <div className="bg-black/80 text-white p-2 truncate absolute bottom-0 w-full">
                  {title}
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-info">No movies found.</p>
      )}
    </div>
  );
};

export default MovieList;
