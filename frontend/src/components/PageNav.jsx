import { Avatar, Dropdown, Space } from 'antd';
import { useAuth } from '../context/authContext';
import Logo from './Logo';
import { NavLink, useNavigate } from 'react-router-dom';

function PageNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const items = [
    {
      key: '1',
      disabled: true,
      label: <NavLink to="/info">个人中心(待开发中...)</NavLink>,
    },
    {
      key: '2',
      danger: true,
      label: <div onClick={handleLogout}>退出登录</div>,
    },
  ];

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="flex h-[10vh] items-center justify-between p-10">
      <div className="flex items-center gap-16">
        <Logo />
        <NavLink
          to="/more"
          className="font-ZCOOL-Q text-3xl text-slate-100 hover:text-slate-300"
        >
          more...
        </NavLink>
      </div>
      {user ? (
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar
                style={{
                  backgroundColor: '#cfe9fd',
                  color: '#0076f5',
                }}
                size={40}
              >
                {user?.name?.[0]?.toUpperCase()}
              </Avatar>
            </Space>
          </a>
        </Dropdown>
      ) : (
        <ul className="flex list-none items-center gap-16">
          <li className="mr-3">
            <NavLink
              to="/login"
              className="text-light-2 text-xl 
            font-semibold uppercase text-slate-100 
            no-underline hover:text-slate-300"
              activeClassName="text-brand-2"
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className="text-light-2 text-xl 
            font-semibold uppercase text-slate-100 
            no-underline hover:text-slate-300"
              activeClassName="text-brand-2"
            >
              Signup
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default PageNav;
