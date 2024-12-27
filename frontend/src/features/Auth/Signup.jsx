import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import LinkBtn from '../../components/LinkBtn';
import PageNav from '../../components/PageNav';
import { useAuth } from '../../context/authContext';
import Cookies from 'js-cookie';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const { signup, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) navigate('/app');
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert('密码不一致');
      return;
    }
    await signup(name, email, password, passwordConfirm);
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
          注册新用户
        </h1>
        <div className="mb-5 flex flex-col gap-2">
          <label htmlFor="name" className="text-base font-semibold">
            名称:
          </label>
          <input
            type="name"
            id="name"
            name="name"
            placeholder="请输入邮箱地址"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="input text-base"
            required
          />
        </div>
        <div className="mb-5 flex flex-col gap-2">
          <label htmlFor="email" className="text-base font-semibold">
            邮箱:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="请输入邮箱地址"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="input text-base"
            required
          />
        </div>
        <div className="mb-5 flex flex-col gap-2">
          <label htmlFor="password" className="text-base font-semibold">
            密码:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="请输入密码"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="input text-base"
            required
          />
        </div>
        <div className="mb-5 flex flex-col gap-2">
          <label htmlFor="passwordConfirm" className="text-base font-semibold">
            确认密码:
          </label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="请输入密码"
            onChange={(e) => setPasswordConfirm(e.target.value)}
            value={passwordConfirm}
            className="input text-base"
            required
          />
        </div>

        <div className="mt-10 flex justify-center">
          <Button type="primary" className="text-base" onClick={handleSignup}>
            Signup for free!
          </Button>
        </div>

        <div className="flex items-end justify-end">
          <LinkBtn to="/login">已有账户,直接登陆...</LinkBtn>
        </div>
      </form>
    </main>
  );
}

export default Signup;
