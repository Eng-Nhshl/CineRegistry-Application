import { useSelector } from "react-redux";
import { useMovies } from "../hooks/useMovies";
import Movie from "./Movie";

const MovieList = () => {
  const { movies, isLoading, isError } = useMovies();
  const filter = useSelector((state) => state.filter);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium animate-pulse">
          Fetching your collection...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
        <p className="text-red-600 font-bold">Service Unavailable</p>
        <p className="text-red-500 text-sm">
          The movie server is having trouble. Please try again later.
        </p>
      </div>
    );
  }

  const filteredMovies = movies.filter((movie) => {
    const searchTerm = filter?.toLowerCase() ?? "";
    const title = movie.title?.toLowerCase() ?? "";
    const director = movie.director?.toLowerCase() ?? "";
    const genre = movie.genre?.toLowerCase() ?? "";

    return (
      title.includes(searchTerm) ||
      director.includes(searchTerm) ||
      genre.includes(searchTerm)
    );
  });

  // Empty State: When search returns nothing
  if (filteredMovies.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-200">
        <div className="text-4xl mb-4">🎬</div>
        <h3 className="text-lg font-bold text-gray-800">No movies found</h3>
        <p className="text-gray-500">
          Try adjusting your search or add a new movie above.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* 1. Header Row (Title + Badge) */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
        <h2 className="text-2xl font-bold text-gray-800">Your Collection</h2>
        <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600 shadow-sm border border-blue-100 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          Live Sync Active
        </span>
      </div>

      {/* 2. The Movie List (Moved outside the flex header) */}
      <ul className="space-y-0">
        {filteredMovies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
