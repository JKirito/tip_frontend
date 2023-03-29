import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='App'>
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
        <button type='submit'>Login</button>
      </div>
    </div>
  );
}

export default App;
