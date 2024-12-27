const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('../models/movieModels');

dotenv.config({ path: './config.env' });

// declare DB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB)
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection successful!');
  });

const movies = JSON.parse(
  fs.readFileSync(`${__dirname}/cleaned_movies.json`, 'utf-8'),
);

const importData = async () => {
  try {
    await Movie.create(movies);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Movie.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const findById = async (id) => {
  try {
    const movie = await Movie.findById(id);
    console.log(movie);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  findById(process.argv[2]);
}
