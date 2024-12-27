import { Link } from 'react-router-dom';

function MovieItem({ movie }) {
  const { _id, NAME, GENRES, REGIONS, RELEASE_DATE, MOVIE_ID } = movie;
  const name = NAME.split('-')[0].trim();

  return (
    <li key={_id ?? MOVIE_ID} className="">
      <Link
        to={`?id=${_id ?? MOVIE_ID}`}
        className="my-2 flex gap-5 
            rounded-lg border-2 border-gray-800 
            p-2 transition-all duration-300 
            hover:bg-slate-500"
      >
        <img
          src={`https://dou.img.lithub.cc/movie/${_id ?? MOVIE_ID}.jpg`}
          alt={NAME}
          className="h-24 w-16 rounded-lg"
        />
        <div
          className="flex w-24 flex-initial 
            flex-col items-start justify-between 
            gap-1"
        >
          <h3 className="text-base font-bold">
            {name.length > 6 ? name.slice(0, 6) + '...' : name}
          </h3>
          <time className="mb-2 text-xs">
            {_id ? RELEASE_DATE.split('-')[0] : RELEASE_DATE.split(' ')[3]}
          </time>
        </div>
        <p className="mt-2 w-16 flex-initial text-xs">{REGIONS}</p>
        <p className="mt-2 flex-auto text-xs">{GENRES}</p>
      </Link>
    </li>
  );
}

export default MovieItem;
