function DashboardBody({ currentMovie, id }) {
  return (
    <div className="flex flex-row gap-2">
      <img
        src={`https://dou.img.lithub.cc/movie/${id}.jpg`}
        alt={currentMovie.NAME}
        className="h-[27rem] w-[18rem] rounded-lg"
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-slate-200 hover:text-slate-500">
          {currentMovie.NAME.split('-')[0].trim()}
        </h3>
        <div className="mt-2 text-slate-400 ">
          <p className="hover:text-slate-500">类型: {currentMovie.GENRES}</p>
          <p className="hover:text-slate-500">地区: {currentMovie.REGIONS}</p>
          <p className="hover:text-slate-500">
            年份: {currentMovie.RELEASE_DATE.split('-')[0]}
          </p>
          <p className="hover:text-slate-500">
            上映:{' '}
            {currentMovie.RELEASE_DATE.slice(0, 10) +
              `(${currentMovie.REGIONS.split('/')[0].trim()})`}
          </p>
        </div>
        <div className="mt-2 flex-auto text-slate-400 hover:text-slate-500">
          主演:
          {currentMovie.ACTORS.split('/').join(',') +
            `/导演:${currentMovie.DIRECTORS.split('/').join(',')}`}
        </div>
        <div className="mt-2 flex-auto text-slate-400 hover:text-slate-500">
          <a
            href={`https://movie.douban.com/subject/${id}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-2"
          >
            <img
              src="/favicon.ico"
              alt="Favicon"
              className="h-auto w-6 rounded-lg"
            />{' '}
            <span>
              豆瓣评分:
              {currentMovie.DOUBAN_SCORE === 0
                ? '暂无'
                : currentMovie.DOUBAN_SCORE}
            </span>
          </a>
        </div>
        <div className="text-slate-400">简介:{currentMovie.STORYLINE}</div>
      </div>
    </div>
  );
}

export default DashboardBody;
