import { createContext, useContext, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:3000/api/v1';

const authContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false };
    case 'signup':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'rejected':
      return { ...state, error: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const AuthProvider = ({ children }) => {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchMe = async (token) => {
      try {
        const res = await axios.get(`${BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data } = res.data;
        dispatch({ type: 'login', payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: 'rejected', payload: err });
      }
    };

    const token = Cookies.get('token');
    if (token) {
      fetchMe(token);
    }
  }, []);

  async function login(email, password) {
    const login_user = { email, password };
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, login_user, {
        headers: {
          'Content-Type': 'application/json', // 明确声明请求类型
        },
      });
      const { data, token } = response.data;
      Cookies.set('token', token);
      dispatch({ type: 'login', payload: data.user });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'rejected', payload: error });
    }
  }

  async function signup(name, email, password, passwordConfirm) {
    const user = { name, email, password, passwordConfirm, role: 'user' };
    try {
      const response = await axios.post(`${BASE_URL}/users/signup`, user);
      const { data, token } = response.data;
      Cookies.set('token', token);
      dispatch({ type: 'signup', payload: data.user });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'rejected', payload: error });
    }
  }

  async function logout() {
    Cookies.remove('token');
    dispatch({ type: 'logout' });
  }

  async function updateUserRatedMovies(id, rating) {
    const ratedMovies = user.ratedMovies;
    ratedMovies[id] = rating;
    const token = Cookies.get('token');
    try {
      const res = await axios.patch(
        `${BASE_URL}/users/updateMe`,
        { ratedMovies },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = res.data;
      dispatch({ type: 'login', payload: data.user });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'rejected', payload: error });
    }
  }

  async function updateRecommendMovies(recommendMovies) {
    const token = Cookies.get('token');
    try {
      const res = await axios.patch(
        `${BASE_URL}/users/updateMe`,
        { recommendMovies },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = res.data;
      dispatch({ type: 'login', payload: data.user });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'rejected', payload: error });
    }
  }

  return (
    <authContext.Provider
      value={{
        user,
        isAuthenticated,
        error,
        dispatch,
        login,
        signup,
        logout,
        updateUserRatedMovies,
        updateRecommendMovies,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
