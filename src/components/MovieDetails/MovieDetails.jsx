import { useParams } from "react-router-dom";
import { useMovie } from "../../hooks";
import { FullPageLoader } from "../Loader";
import { NotFound } from "../NotFound";
import { MovieOverview } from "./MovieOverview";

export const MovieDetails = () => {
  const { id } = useParams();
  const [movie, loading] = useMovie(id);

  if (!loading && !movie) {
    return <NotFound />;
  }

  return loading ? (
    <FullPageLoader />
  ) : (
    <div>
      <div
        className="bg-cover bg-no-repeat w-full max-h-[70vh] min-h-[35vh] text-white"
        style={{
          backgroundImage: `url(${movie?.backdropUrl})`,
          height: "calc(100vw / 1.8)",
        }}
      >
        <div className="h-full w-full p-[3%] flex items-center bg-gradient-to-t from-black/90 to-black/0 md:to-black/40">
          <img
            className="h-full object-cover rounded-md"
            src={movie?.imageUrl}
            alt={movie?.title}
          />
          <div className="hidden md:block px-6 mr-24">
            <MovieOverview movie={movie} />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <MovieOverview movie={movie} />
      </div>
    </div>
  );
};

export default MovieDetails;
