import { useField } from "../hooks/useField";
import { useMovies } from "../hooks/useMovies";
import { useStars } from "../hooks/useStars";
import StarRating from "./StarRating";

const MovieForm = () => {
  const { reset: clearTitle, ...title } = useField("text");
  const { reset: clearDirector, ...director } = useField("text");
  const { reset: clearYear, ...year } = useField("number");
  const { reset: clearGenre, ...genre } = useField("text");

  const rating = useStars(0);
  const { addMovie, isLoading } = useMovies(); // Assuming you return isLoading/isPending

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie({
      title: title.value,
      director: director.value,
      year: Number(year.value),
      genre: genre.value,
      rating: rating.value,
      watched: false,
    });

    clearTitle();
    clearDirector();
    clearYear();
    clearGenre();
    rating.reset();
  };

  const inputClass =
    "w-full p-3 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all placeholder:text-gray-400 text-gray-700 shadow-sm";

  return (
    <div className="mb-8 p-8 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50">
      <header className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-extrabold text-gray-800 tracking-tight">
          Add to Collection
        </h3>
        <span className="text-xs font-bold uppercase tracking-widest text-green-500 bg-green-50 px-2 py-1 rounded">
          New Entry
        </span>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 ml-1">
              Title
            </label>
            <input
              {...title}
              placeholder="e.g. Inception"
              required
              className={inputClass}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 ml-1">
              Director
            </label>
            <input
              {...director}
              placeholder="e.g. Christopher Nolan"
              required
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 ml-1">
              Release Year
            </label>
            <input
              {...year}
              placeholder="2010"
              required
              className={inputClass}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 ml-1">
              Genre
            </label>
            <input
              {...genre}
              placeholder="Sci-Fi"
              required
              className={inputClass}
            />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between border border-gray-100">
          <span className="text-sm font-bold text-gray-600">
            Initial Rating is: 0
          </span>
          <StarRating starHook={rating} />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-black py-4 rounded-xl shadow-lg shadow-green-200 transition-all transform active:scale-[0.97] flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? "Saving..." : "Add Movie"}
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
