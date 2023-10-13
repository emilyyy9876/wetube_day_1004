import {
  getMovieById,
  getMovies,
  getMovieByMinimumRating,
  getMovieByMinimumYear
} from "./db";

export const home = (req, res) => {
  const moviesList = getMovies();
  res.render("home", { moviesList: moviesList });
};

export const movieDetail = (req, res) => {
  const movie = getMovieById(req.params.id);
  res.render("movie", { movie: movie });
};

export const filterMovie = (req, res) => {
  const queryObject = req.query;
  //defining year value
  let year = queryObject["selectedYear"];
  if (year === "") {
    const localYear = "1895";
    year = localYear;
  }
  //definin rating value
  let rating = queryObject["selectedRating"];
  if (rating === "") {
    const localRating = "0";
    rating = localRating;
  }
  const moviesByYear = getMovieByMinimumYear(year);
  const moviesByRating = getMovieByMinimumRating(rating);

  const moviesByYearSet = new Set(moviesByYear);
  const moviesByRatingSet = new Set(moviesByRating);
  const moviesSet = new Set(
    [...moviesByYearSet].filter((value) => moviesByRatingSet.has(value))
  );
  const moviesList = Array.from(moviesSet);
  res.render("home", { moviesList: moviesList });
};
