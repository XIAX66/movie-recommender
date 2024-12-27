import { NavLink } from 'react-router-dom';
import { useMovies } from '../../context/moviesContext';

function AppNav() {
  const { dispatch } = useMovies();

  return (
    <nav className="mb-2">
      <ul className="flex items-center gap-16 font-ZCOOL_K text-3xl text-slate-100">
        <li onClick={() => dispatch({ type: 'movie/reset' })}>
          <NavLink
            to="movies-library"
            className="block rounded px-8 py-2 
                text-xl font-bold uppercase 
                text-inherit text-slate-300 
                no-underline hover:text-slate-800 
                active:text-slate-500"
          >
            电影库
          </NavLink>
        </li>
        <li onClick={() => dispatch({ type: 'movie/reset' })}>
          <NavLink
            to="movies-recommender"
            className="block rounded px-8 py-2 
                text-xl font-bold uppercase 
                text-inherit text-slate-300 
                no-underline hover:text-slate-800 
                active:text-slate-700"
          >
            推荐电影
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
