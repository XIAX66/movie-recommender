import { Rate } from 'antd';

function DashboardRating({ rating, setRating }) {
  return (
    <div className="mt-24 flex items-center justify-center gap-5">
      <p className="text-3xl text-slate-300">您的评分:</p>
      <Rate allowHalf value={rating} onChange={(rating) => setRating(rating)} />
    </div>
  );
}

export default DashboardRating;
