import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import movieService from "../services/movies";
import useNotificationStore from "../stores/useNotificationStore";

export const useMovies = () => {
  const queryClient = useQueryClient();
  const setNotification = useNotificationStore(
    (state) => state.setNotification,
  );

  const moviesQuery = useQuery({
    queryKey: ["movies"],
    queryFn: movieService.getAll,
  });

  const addMovieMutation = useMutation({
    mutationFn: movieService.create,
    onSuccess: (newMovie) => {
      queryClient.setQueryData(["movies"], (oldMovies) => [
        ...(oldMovies || []),
        newMovie,
      ]);
      setNotification(`Successfully added "${newMovie.title}"`);
    },
    onError: (error) => {
      setNotification(`Error: ${error.response?.data?.error || error.message}`);
    },
  });

  const deleteMovieMutation = useMutation({
    mutationFn: movieService.delete,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["movies"] });

      const previousMovies = queryClient.getQueryData(["movies"]);

      queryClient.setQueryData(["movies"], (oldMovies) =>
        oldMovies ? oldMovies.filter((movie) => movie.id !== id) : [],
      );

      return { previousMovies };
    },
    onSuccess: () => {
      setNotification("Movie deleted successfully.");
    },
    onError: (error, id, context) => {
      queryClient.setQueryData(["movies"], context.previousMovies);
      setNotification(`Error: ${error.response?.data?.error || error.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  const updateMovieMutation = useMutation({
    mutationFn: ({ id, newObject }) => movieService.update(id, newObject),
    onMutate: async ({ id, newObject }) => {
      await queryClient.cancelQueries({ queryKey: ["movies"] });
      const previousMovies = queryClient.getQueryData(["movies"]);

      // Optimistically swap out the updated fields in the cache immediately
      queryClient.setQueryData(["movies"], (oldMovies) =>
        oldMovies
          ? oldMovies.map((movie) =>
              movie.id === id ? { ...movie, ...newObject } : movie,
            )
          : [],
      );

      return { previousMovies };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(["movies"], context.previousMovies);
      setNotification(`Error: ${error.response?.data?.error || error.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  return {
    movies: moviesQuery.data || [],
    isLoading: moviesQuery.isLoading,
    isError: moviesQuery.isError,

    addMovie: addMovieMutation.mutate,
    deleteMovie: deleteMovieMutation.mutate,
    updateMovie: updateMovieMutation.mutate,

    toggleWatched: (movie) => {
      const updatedMovie = { ...movie, watched: !movie.watched };
      updateMovieMutation.mutate({ id: movie.id, newObject: updatedMovie });
    },

    isAdding: addMovieMutation.isPending,
    isUpdating: updateMovieMutation.isPending,
    isDeleting: deleteMovieMutation.isPending,
  };
};
