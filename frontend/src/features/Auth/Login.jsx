import PageNav from '../../components/PageNav';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import LinkBtn from '../../components/LinkBtn';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) navigate('/app');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    const token = Cookies.get('token');
    if (token) navigate('/app');
    else {
      const errormsg = `${error?.status}: ${error?.response?.data?.message}`;
      alert(errormsg);
    }
  };

  return (
    <main className="page">
      <PageNav />
      <form className="form">
        <h1 className="mb-8 flex justify-center text-3xl font-semibold">
          登陆
        </h1>
        <div className="mb-5 flex flex-col gap-2">
          <label htmlFor="email" className="text-lg font-semibold">
            邮箱:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="请输入邮箱地址"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="input text-lg"
            required
          />
        </div>
        <div className="mb-5 flex flex-col gap-2">
          <label htmlFor="password" className="text-lg font-semibold">
            密码:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="请输入密码"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="input text-lg"
            required
          />
        </div>

        <div className="mt-10 flex justify-center">
          <Button type="primary" className="text-lg" onClick={handleLogin}>
            Login
          </Button>
        </div>

        <div className="flex items-end justify-end">
          <LinkBtn to="/signup">注册新用户</LinkBtn>
        </div>
      </form>
    </main>
  );
}

export default Login;
