import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { ErrorMessage, User } from './interface';

function App() {
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
      .then((res) => {
        setLoginStatus(true);
        console.log('Logged In Successfully');
      })
      .catch((err) => {
        console.error(err);
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
    <div className='App'>
      {loginStatus && (
        <div>
          <h1>Welcome {user}, please log out</h1>
          <button type='submit' onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      {!loginStatus && (
        <div>
          <span>Username</span>
          <input
            type='text'
            name='username'
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <span>Password</span>
          <input
            type='password'
            name='password'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <button type='submit' onClick={handleSubmit}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
