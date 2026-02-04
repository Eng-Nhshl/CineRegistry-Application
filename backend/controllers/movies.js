const moviesRouter = require("express").Router();
const Movie = require("../models/movie");

moviesRouter.get("/", async (req, res) => {
  const movies = await Movie.find({});
  res.json(movies);
});

moviesRouter.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).end();
  }
});

moviesRouter.post("/", async (req, res) => {
  const body = req.body;

  const movie = new Movie({
    title: body.title,
    director: body.director,
    year: body.year,
    genre: body.genre,
    rating: body.rating || 3,
  });

  const savedMovie = await movie.save();
  res.status(201).json(savedMovie);
});

moviesRouter.put("/:id", async (req, res) => {
  const { title, director, year, genre, rating, watched } = req.body;

  const updatedMovie = await Movie.findByIdAndUpdate(
    req.params.id,
    { title, director, year, genre, rating, watched },
    { new: true, runValidators: true, context: "query" },
  );

  if (updatedMovie) {
    res.json(updatedMovie);
  } else {
    res.status(404).end();
  }
});

moviesRouter.delete("/:id", async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = moviesRouter;
