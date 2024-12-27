const express = require('express');
const movieController = require('../controllers/movieControllers');

const router = express.Router();

router.route('/').get(movieController.getAllMovies);
router.route('/:id').get(movieController.getMovie);

module.exports = router;
