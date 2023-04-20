import React, { useState, useEffect, FormEventHandler } from 'react';
import { ErrorMessage, TokenData } from '../interface';
import axios, { AxiosResponse, AxiosError } from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [user, setUser] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post('http://localhost:4000/login', {
        username,
        password,
      })
      .then((res: AxiosResponse) => {
        const result: TokenData = res.data;
        const { token } = result;
        localStorage.setItem('token', token);
        setLoginStatus(true);
        console.log('Logged In Successfully');
      })
      .catch((err: AxiosError) => {
        const data: ErrorMessage = err.response?.data as ErrorMessage;
        console.log(`Failed to Validate User ${data.msg}`);
      });
  };

  useEffect(() => {
    const checkStatus = async () => {
      const token = localStorage.getItem('token');
      await axios
        .get('http://localhost:4000/validate', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setLoginStatus(true);
        })
        .catch((err) => {
          console.log(err);
          setLoginStatus(false);
        });
    };
    checkStatus();
  }, []);

  const handleLogout = async () => {
    await axios
      .post('http://localhost:4000/logout')
      .then((data) => {
        console.log('logged Out Successfully');
        setLoginStatus(false);
      })
      .catch((err) => console.error);
  };

  return (
    <div>
      {loginStatus && (
        <div>
          <h1>Welcome {user}, please log out</h1>
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
            // name='username'
            autoComplete='username'
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <span>Password</span>
          <input
            type='password'
            // name='password'
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
