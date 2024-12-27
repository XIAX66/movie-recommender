import { useEffect, useState } from 'react';
import { useMovies } from '../../context/moviesContext';
import { useUrl } from '../../utils/useUrl';
import { useAuth } from '../../context/authContext';
import DashboardHeader from '../../components/DashboardHeader';
import DashboardBody from '../../components/DashboardBody';
import DashboardRating from '../../components/DashboardRating';
import DashboardFooter from '../../components/DashboardFooter';

function Dashboard() {
  const { currentMovie, fetchMovie, dispatch, fetchRecommendMovies } =
    useMovies();
  const { user, updateUserRatedMovies } = useAuth();
  const [id] = useUrl();
  const [rating, setRating] = useState(user?.ratedMovies[id] ?? 0);
  const [genaratingtext, setGenaratingtext] = useState('生成推荐电影');

  const handleGenerateRecommendation = async () => {
    setGenaratingtext('正在生成推荐电影...');
    await fetchRecommendMovies(user);
    setGenaratingtext('生成推荐电影');
  };

  useEffect(() => {
    setRating(user?.ratedMovies[id] ?? 0);
    if (id) {
      fetchMovie(id);
    }
  }, [id]);

  useEffect(() => {
    if (user && rating) {
      updateUserRatedMovies(id, rating);
    }
  }, [rating]);

  return (
    <div
      className="flex h-[calc(90vh-2.4rem)] 
                    basis-[56rem] flex-col 
                  bg-gray-700 px-[5rem] 
                    py-[3rem]"
    >
      {currentMovie._id ? (
        <>
          <DashboardHeader
            dispatch={dispatch}
            handleGenerateRecommendation={handleGenerateRecommendation}
            genaratingtext={genaratingtext}
          />
          <DashboardBody currentMovie={currentMovie} id={id} />
          <DashboardRating rating={rating} setRating={setRating} />
          <DashboardFooter />
        </>
      ) : (
        <div className="mt-64 flex items-center justify-center text-slate-400">
          欢迎来到Movie-Recommender
        </div>
      )}
    </div>
  );
}

export default Dashboard;
