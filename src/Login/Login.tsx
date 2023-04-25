import React, { useState, useEffect, FormEventHandler } from 'react';
import { ErrorMessage, TokenData } from '../interface';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../states/store';
import { login, logout } from '../states/slices/userSlice';
import authorizedInstance from '../axiosInstances/authInstance';
import baseInstance from '../axiosInstances/baseInstance';
import { useNavigate } from 'react-router-dom';

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
        const { token } = result;
        localStorage.setItem('token', token);
        dispatch(
          login({
            loginstatus: true,
            username: username,
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

  useEffect(() => {
    const checkStatus = async () => {
      const token = localStorage.getItem('token');

      await authorizedInstance
        .get('/validate')
        .then((res) => {
          // console.log(res.data);
          dispatch(
            login({
              loginstatus: true,
              username: res.data.username,
            })
          );
        })
        .catch((err) => {
          // dispatch(logout());
        });
    };
    checkStatus();
  }, []);

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
      {loginStatus && (
        <div>
          <h1>Welcome {user.username}, please log out</h1>
          <button type='submit' onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      {!loginStatus && (
        <form onSubmit={onSubmit}>
          <span>Username</span>
          <input
            type='text'
            autoComplete='username'
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <span>Password</span>
          <input
            type='password'
            autoComplete='current-password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <button type='submit'>Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
