const Movie = require('../models/movieModels');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Movie.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const movies = await features.query;

  res.status(200).json({
    status: 'success',
    results: movies.length,
    data: {
      movies,
    },
  });
});

exports.getMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return next(new AppError('No movie found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      movie,
    },
  });
});
