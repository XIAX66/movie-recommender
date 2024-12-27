import { Link } from 'react-router-dom';

function Button({ children, disabled, to, onClick }) {
  const className =
    'tracking-full inline-block rounded-full bg-blue-400 px-4 py-3 font-semibold uppercase text-stone-800 transition-all duration-300 hover:bg-blue-300 focus:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-offset-2 disabled:cursor-not-allowed md:px-6 md:py-4';

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
