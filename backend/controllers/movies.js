const Movie = require("../models/movie");
const createRouter = require("./BaseController");

const moviesRouter = createRouter(Movie, [
  "title",
  "director",
  "year",
  "genre",
]);

module.exports = moviesRouter;
