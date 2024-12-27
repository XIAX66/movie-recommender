import LinkBtn from './LinkBtn';

function DashboardHeader({
  dispatch,
  handleGenerateRecommendation,
  genaratingtext,
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <LinkBtn
        to="/app/movies-library"
        color="slate"
        onClick={() => dispatch({ type: 'movie/reset' })}
      >
        返回
      </LinkBtn>
      <button
        className="text-sm text-blue-400 
            hover:text-blue-600 hover:underline"
        onClick={handleGenerateRecommendation}
        disabled={genaratingtext === '生成推荐电影' ? false : true}
      >
        {genaratingtext}
      </button>
    </div>
  );
}

export default DashboardHeader;
