import React, { useState } from 'react';
import baseInstance from '../axiosInstances/baseInstance';
import { useNavigate } from 'react-router-dom';
interface SignupData {
  username: string;
  password: string;
}

const Signup = () => {
  const [data, setData] = useState<SignupData>({ password: '', username: '' });
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(data);
    if (data.username === '' || data.password === '') {
      console.log(`Credentials not specified`);
      return;
    }
    baseInstance
      .post('/signup', {
        ...data,
      })
      .then((res) => {
        console.log(`Signup Successful`);
        navigate('/login');
      })
      .catch((err) => console.error);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='font-medium capitalize'>username</label>
          <input
            type='text'
            name='username'
            onChange={handleChange}
            className='input_text font-medium'
          />
        </div>
        <div>
          <label className='font-medium capitalize'>Password</label>
          <input
            type='password'
            name='password'
            onChange={handleChange}
            className='input_text font-medium'
          />
        </div>
        <div>
          <label></label>
          <input type='text' name='' />
        </div>
        <input
          type='submit'
          value='Submit'
          className='btn-green uppercase font-medium'
        />
      </form>
    </div>
  );
};

export default Signup;
