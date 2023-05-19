import React, { useState, useEffect, FormEventHandler } from 'react';
import { ErrorMessage, TokenData } from '../interface';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../states/store';
import { login, logout } from '../states/slices/userSlice';
import authorizedInstance from '../axiosInstances/authInstance';
import baseInstance from '../axiosInstances/baseInstance';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [loginStatus, setLoginStatus] = useState<boolean>(false);
  // const [user, setUser] = useState('');
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const loginStatus = useSelector((state: RootState) => state.user.loginstatus);
  const dispatch = useDispatch();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    baseInstance
      .post('/login', { username, password })
      .then((res: AxiosResponse) => {
        const result: TokenData = res.data;
        const { token, role } = result;
        localStorage.setItem('token', token);
        dispatch(
          login({
            loginstatus: true,
            username: username,
            role: role,
          })
        );
        console.log('Logged In Successfully');
        navigate('/');
      })
      .catch((err: AxiosError) => {
        const data: ErrorMessage = err.response?.data as ErrorMessage;
        console.log(`Failed to Validate User ${data.msg}`);
      });
  };

  // useEffect(() => {
  //   const checkStatus = async () => {
  //     const token = localStorage.getItem('token');

  //     await authorizedInstance
  //       .get('/validate')
  //       .then((res) => {
  //         // console.log(res.data);
  //         dispatch(
  //           login({
  //             loginstatus: true,
  //             username: res.data.username,
  //           })
  //         );
  //       })
  //       .catch((err) => {
  //         // dispatch(logout());
  //       });
  //   };
  //   checkStatus();
  // }, []);

  const handleLogout = async () => {
    await axios
      .post('http://localhost:4000/logout')
      .then((data) => {
        localStorage.removeItem('token');
        console.log('logged Out Successfully');
        dispatch(logout());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {loginStatus && <Navigate to='/' />}

      {!loginStatus && (
        <form
          className='flex w-[100%] h-[70vh] justify-center items-center'
          onSubmit={onSubmit}
        >
          <div className='flex flex-col gap-4 h-[400px] w-[80%]'>
            <div className='flex text-center justify-center'>
              <p className='text-4xl text-center font-semibold text-[#68EDC6]'>
                System Login
              </p>
            </div>
            <div className='flex flex-col gap-4'>
              <span className='text-xl font-semibold'>Username</span>
              <input
                type='text'
                className='input_text text-lg'
                autoComplete='username'
                placeholder='Username'
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className='flex flex-col gap-4'>
              <span className='text-xl font-semibold'>Password</span>
              <input
                type='password'
                className='input_text text-lg'
                autoComplete='current-password'
                placeholder='********'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className='flex justify-center mt-4'>
              <button
                type='submit'
                className='btn-green px-9 uppercase font-semibold text-lg'
              >
                Login
              </button>
            </div>
            <p className='text-right text-lg'>
              Don't have an account?{' '}
              <Link to='/signup'>
                <span className='underline'>Sign Up</span>
              </Link>
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
