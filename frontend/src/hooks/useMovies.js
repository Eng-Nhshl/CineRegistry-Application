import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import movieService from "../services/movies";
import { setNotification } from "../reducers/notificationReducer";

export const useMovies = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const moviesQuery = useQuery({
    queryKey: ["movies"],
    queryFn: movieService.getAll,
  });

  const addMovieMutation = useMutation({
    mutationFn: movieService.create,
    onSuccess: (newMovie) => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      dispatch(setNotification(`Successfully added "${newMovie.title}"`));
    },
    onError: (error) => {
      dispatch(setNotification(`Error: ${error.message}`));
    },
  });

  const deleteMovieMutation = useMutation({
    mutationFn: movieService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      dispatch(setNotification(`Movie deleted successfully.`));
    },
  });

  const updateMovieMutation = useMutation({
    mutationFn: ({ id, newObject }) => movieService.update(id, newObject),
    onSuccess: (updatedMovie) => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      dispatch(`Updated "${updatedMovie.title}"`);
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
    isUpdating: updateMovieMutation.isPending,
    isDeleting: deleteMovieMutation.isPending,
  };
};
