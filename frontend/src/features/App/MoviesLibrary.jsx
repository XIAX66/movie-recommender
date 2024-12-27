import { useMovies } from '../../context/moviesContext';
import { useEffect, useState } from 'react';
import MovieItem from './MovieItem';
import { Pagination } from 'antd';

function MoviesLibrary() {
  const { movies, fetchMovies } = useMovies();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMovies(page, 5);
  }, [page]);

  return (
    <div
      className="flex w-[28rem] flex-col 
    items-center rounded-lg border-2 
    border-gray-800 bg-slate-400 p-4"
    >
      <ul className="mb-2 w-full">
        {movies.map((movie) => (
          <MovieItem key={movie._id} movie={movie} />
        ))}
      </ul>
      <Pagination
        simple
        current={page}
        defaultPageSize={5}
        showSizeChanger={false}
        total={500}
        onChange={(page) => setPage(page)}
      />
    </div>
  );
}

export default MoviesLibrary;
