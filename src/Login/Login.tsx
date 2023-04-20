import React, { useState, useEffect } from 'react';
import { ErrorMessage } from '../interface';
import axios, { AxiosResponse, AxiosError } from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  const [user, setUser] = useState('');

  const handleSubmit = async () => {
    axios
      .post('http://localhost:4000/login', {
        username,
        password,
      })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        // setLoginStatus(true);
        console.log('Logged In Successfully');
      })
      .catch((err: AxiosError) => {
        const data: ErrorMessage = err.response?.data as ErrorMessage;
        console.log(`Failed to Validate User ${data.msg}`);
      });
  };

  useEffect(() => {
    const checkStatus = async () => {
      await axios
        .get('http://localhost:4000/')
        .then((res) => {
          console.log(res.data);
          if (res.data.username) {
            setLoginStatus(true);
          } else {
            setLoginStatus(false);
          }
        })
        .catch((err) => console.log(err));
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
        <form>
          <span>Username</span>
          <input
            type='text'
            name='username'
            autoComplete='username'
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <span>Password</span>
          <input
            type='password'
            name='password'
            autoComplete='current-password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <button type='submit' onClick={handleSubmit}>
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
