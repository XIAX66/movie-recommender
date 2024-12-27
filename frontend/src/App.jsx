import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import Error from './ui/Error';
import More from './ui/More';
import HomePage from './ui/HomePage';
import PageNotFound from './ui/PageNotFound';
import Applayout from './features/App/Applayout';
import Login from './features/Auth/Login';
import Signup from './features/Auth/Signup';
import MoviesLibrary from './features/App/MoviesLibrary';
import MoviesRecommender from './features/App/MoviesRecommender';
import UserInfo from './features/User/UserInfo';
import WatchedMovies from './features/User/WatchedMovies';
import ChangePassword from './features/Auth/ChangePassword';
import { MoviesProvider } from './context/moviesContext';
import { AuthProvider } from './context/authContext';

const router = createBrowserRouter([
  {
    element: <HomePage />,
    path: '/',
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/app',
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate replace to="movies-library" />,
      },
      {
        path: 'movies-library',
        element: <MoviesLibrary />,
      },
      {
        path: 'movies-recommender',
        element: <MoviesRecommender />,
      },
    ],
  },
  {
    path: '/user',
    element: <UserInfo />,
  },
  {
    path: '/watched-movies',
    element: <WatchedMovies />,
  },
  {
    path: '/change-password',
    element: <ChangePassword />,
  },
  {
    path: '/more',
    element: <More />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

/*route:

1. '/' Start page
2. '/login' Login page
3. '/signup' Signup page
4. '/more' More function developing
5. '/app' app page
6. '/app/movies-library' Movies-library page
7. '/app/movies-recommender' Movies-recommender page
8. '/info' Personal infomation page
9. '/info/watched-movies' Wached-movies page
10. '/info/change-password' Change password page*/

function App() {
  return (
    <AuthProvider>
      <MoviesProvider>
        <RouterProvider router={router} />
      </MoviesProvider>
    </AuthProvider>
  );
}

export default App;
