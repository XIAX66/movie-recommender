import PageNav from '../components/PageNav';
import Button from '../components/Button';
import { useMovies } from '../context/moviesContext';
import { useEffect } from 'react';

function HomePage() {
  const { dispatch } = useMovies();

  useEffect(() => {
    dispatch({ type: 'movie/reset' });
  }, []);

  return (
    <div className="page">
      <main className="">
        <PageNav />

        <section className="mt-32 flex h-[85%] flex-col items-center justify-center gap-10 text-center">
          <h1 className="font-ZCOOL-Q text-6xl text-slate-100">
            电影推荐系统
            <br />
            <small className="text-3xl text-slate-100">欢迎使用</small>
          </h1>
          <h2 className="mb-[2.5rem] mt-8 w-[90%] font-ZCOOL_K text-xl text-slate-200">
            点击下面按钮,您将进入一个我们的电影库中,可以根据喜好,选择喜欢的电影,对其进行评分
            <br />
            评分达到一定数量后,系统会根据您的评分,推荐您可能喜欢的电影
          </h2>
          <Button to="/login" className="mt-6 inline-block text-xl text-white">
            🎬点击进入
          </Button>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
