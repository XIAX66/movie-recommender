import { useEffect, useState } from 'react';
import { useMovies } from '../../context/moviesContext';
import { Pagination } from 'antd';
import MovieItem from './MovieItem';

function MoviesRecommender() {
  const { recommendMovies, fetchMovies } = useMovies();
  const [page, setPage] = useState(1);
  console.log(recommendMovies);

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
        {recommendMovies.slice((page - 1) * 5, page * 5).map((movie) => (
          <MovieItem key={movie._id} movie={movie} />
        ))}
      </ul>
      <Pagination
        simple
        current={page}
        defaultPageSize={5}
        showSizeChanger={false}
        total={20}
        onChange={(page) => setPage(page)}
      />
    </div>
  );
}

export default MoviesRecommender;
