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
        <label>username</label>
        <input type='text' name='username' onChange={handleChange} />
        <br />
        <label>Password</label>
        <input type='password' name='password' onChange={handleChange} />
        {/* <input type='text' name='' /> */}
        <br />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default Signup;
