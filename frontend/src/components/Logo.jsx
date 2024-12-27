import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img src="/popcorn.png" alt="🎬" className="h-12 hover:shadow-lg" />
      <h1 className="font-ZCOOL-Q text-3xl text-slate-100 hover:text-slate-300">
        电影推荐系统
      </h1>
    </Link>
  );
}

export default Logo;
