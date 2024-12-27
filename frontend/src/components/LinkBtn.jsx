import { Link, useNavigate } from 'react-router-dom';

function LinkBtn({ children, to, color = 'blue', onClick }) {
  const navigate = useNavigate();
  const className = `text-sm text-${color}-400 hover:text-${color}-800 hover:underline`;
  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default LinkBtn;
