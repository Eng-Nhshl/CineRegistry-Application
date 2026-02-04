import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import StarRating from "./StarRating";

const Movie = ({ movie }) => {
  const { deleteMovie, toggleWatched, isUpdating, isDeleting, updateMovie } =
    useMovies();
  const [hover, setHover] = useState(0);

  const deleteHandler = () => {
    if (window.confirm(`Are you sure you want to delete "${movie.title}"?`)) {
      deleteMovie(movie.id);
    }
  };

  return (
    <li
      className={`
      flex items-center justify-between p-5 my-4 bg-white rounded-xl shadow-sm 
      transition-all duration-300 hover:shadow-md hover:-translate-y-1
      border-l-[6px] ${movie.watched ? "border-green-500" : "border-blue-500"}
    `}
    >
      <div className="space-y-1">
        <div className="text-lg font-bold text-gray-800">
          {movie.title}{" "}
          <span className="text-gray-400 font-normal">({movie.year})</span>
        </div>

        <div className="text-gray-500 text-sm italic">
          {movie.director} • {movie.genre}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <StarRating
            value={movie.rating}
            hover={hover}
            onHover={setHover}
            onRate={(newRating) =>
              updateMovie({
                id: movie.id,
                newObject: { ...movie, rating: newRating },
              })
            }
          />
          <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-0.5 rounded-md">
            {movie.rating}/5
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => toggleWatched(movie)}
          disabled={isUpdating || isDeleting}
          className={`
            px-4 py-2 rounded-lg font-semibold text-sm transition-all
            ${isUpdating || isDeleting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            ${
              movie.watched
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                : "bg-green-500 text-white hover:bg-green-600 shadow-sm shadow-green-200"
            }
          `}
        >
          {movie.watched ? "Mark Unwatched" : "Mark Watched"}
        </button>

        <button
          onClick={deleteHandler}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold text-sm border border-red-100 
                      hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Movie;
