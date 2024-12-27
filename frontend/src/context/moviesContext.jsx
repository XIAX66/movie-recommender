import axios from 'axios';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { useAuth } from './authContext';

const BASE_URL = 'http://127.0.0.1:3000/api/v1';
const BASE_RECOMMEND_URL = 'http://127.0.0.1:5000/api/v1';

const MoviesContext = createContext();

const initialState = {
  currentMovie: {},
  movies: [],
  isLoading: false,
  error: null,
  recommendMovies: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'movies/loaded':
      return { ...state, movies: action.payload, isLoading: false };
    case 'movie/loaded':
      return { ...state, currentMovie: action.payload, isLoading: false };
    case 'movie/reset':
      return { ...state, currentMovie: {} };
    case 'recommendMovies/loaded':
      return { ...state, recommendMovies: action.payload, isLoading: false };
    case 'rejected':
      return { ...state, error: action.payload, isLoading: false };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const MoviesProvider = ({ children }) => {
  const [
    { currentMovie, movies, isLoading, error, recommendMovies },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { updateRecommendMovies, user } = useAuth();

  useEffect(() => {
    if (user) {
      dispatch({
        type: 'recommendMovies/loaded',
        payload: user.recommendMovies,
      });
    }
  }, [user]);

  const fetchMovies = async (page = 1, limit) => {
    dispatch({ type: 'loading' });
    try {
      const response = await axios.get(
        `${BASE_URL}/movies?limit=${limit}&page=${page}`
      );
      dispatch({ type: 'movies/loaded', payload: response.data.data.movies });
    } catch (error) {
      dispatch({ type: 'rejected', payload: error });
    }
  };

  const fetchMovie = async (id) => {
    dispatch({ type: 'loading' });
    try {
      console.log(id);
      const response = await axios.get(`${BASE_URL}/movies/${id}`);
      dispatch({ type: 'movie/loaded', payload: response.data.data.movie });
    } catch (error) {
      dispatch({ type: 'rejected', payload: error });
    }
  };

  const fetchRecommendMovies = async (user) => {
    const requestBody = {
      _id: user._id,
      ratedMovies: user.ratedMovies,
    };
    dispatch({ type: 'loading' });
    try {
      const response = await axios.post(
        `${BASE_RECOMMEND_URL}/recommend`,
        requestBody
      );
      const { data } = response;
      dispatch({ type: 'recommendMovies/loaded', payload: data });
      await updateRecommendMovies(data);
    } catch (error) {
      dispatch({ type: 'rejected', payload: error });
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        currentMovie,
        movies,
        isLoading,
        error,
        recommendMovies,
        dispatch,
        fetchMovies,
        fetchMovie,
        fetchRecommendMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

const useMovies = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  return context;
};

export { MoviesProvider, useMovies };
