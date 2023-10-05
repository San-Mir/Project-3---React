export const MovieOverview = ({ movie }) => {
  return (
    <div className="flex flex-col px-4 gap-2">
      <div className="flex flex-col items-center justify-center py-4 md:items-start md:py-0">
        <h1 className="flex items-center gap-1 text-lg font-medium">
          {movie?.title}
          <span className="text-sm font-normal opacity-50">
            ({movie?.releaseYear})
          </span>
        </h1>
        <p className="flex justify-center px-6 text-sm opacity-60 md:px-0">
          {movie?.genres.map((genre) => genre.name).join(", ")}
        </p>
      </div>
      <h3 className="italic opacity-70">{movie?.tagline}</h3>
      <div>
        <h2 className="text-lg font-medium py-2">Overview</h2>
        <p className="leading-snug text-sm">{movie?.overview}</p>
      </div>
    </div>
  );
};

export default MovieOverview;
