import MovieForm from "./components/MovieForm";
import Notification from "./components/Notification";
import MovieList from "./components/MovieList";
import Filter from "./components/Filter";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 mb-2">
            CineRegistry Application
          </h1>
          <p className="text-gray-500 font-medium text-lg">
            Your personal cinematic vault.
          </p>
        </header>

        <Notification />

        <main className="space-y-8">
          {/* Add New Movie Section */}
          <section>
            <MovieForm />
          </section>

          {/* Search/Filter Bar */}
          <section>
            <Filter />
          </section>

          {/* List Section */}
          <section>
            <MovieList />
          </section>
        </main>

        <footer className="mt-20 text-center text-gray-400 text-sm">
          <p>
            © 2026 CineRegistry • Built with React 19 & Tailwind v4 By EngNhshl
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
