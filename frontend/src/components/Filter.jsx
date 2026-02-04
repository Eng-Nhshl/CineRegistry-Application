import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-10 group">
      {/* Search Icon (Magnifying Glass) */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type="text"
        className="block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-200 rounded-2xl bg-white shadow-sm transition-all duration-300
                    placeholder:text-gray-400
                    focus:ring-4 focus:ring-blue-100 focus:border-blue-400 focus:outline-none 
                    hover:border-gray-300 hover:shadow-md"
        placeholder="Search by title, director, or genre..."
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />

      {/* Subtle indicator for "active" state */}
      <div className="absolute inset-y-0 right-4 flex items-center pr-1">
        <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-gray-400 bg-gray-100 border border-gray-200 rounded-lg">
          ESC to clear
        </kbd>
      </div>
    </div>
  );
};

export default Filter;
