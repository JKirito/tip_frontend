import React, { useState } from 'react';
import baseInstance from '../axiosInstances/baseInstance';
import { Link, useNavigate } from 'react-router-dom';
import { Roles } from '../interface';
interface SignupData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

const Signup = () => {
  const [data, setData] = useState<SignupData>({
    password: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
  });
  const [adminAccount, setAdminAccount] = useState<boolean>(false);
  const [adminRefCode, setAdminRefCode] = useState<string>('');
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
        role: adminAccount ? Roles.ADMIN : Roles.BASIC,
        adminRefCode,
      })
      .then((res) => {
        console.log(`Signup Successful`);
        navigate('/login');
      })
      .catch((err) => {
        console.log(`Signup Failed`);
        console.log(err.response.data);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === Roles.ADMIN) {
      setAdminAccount(true);
    } else {
      setAdminAccount(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4'>
        <div className='flex justify-center mb-4'>
          <p className='text-3xl font-medium capitalize text-[#68EDC6]'>
            Account Creation
          </p>
        </div>
        <div className='flex flex-row gap-4'>
          <div className='flex flex-col gap-4 w-1/2'>
            <label className='font-medium text-xl capitalize'>First Name</label>
            <input
              type='text'
              name='firstName'
              onChange={handleChange}
              className='input_text text-lg font-medium'
              placeholder='First Name'
            />
          </div>
          <div className='flex flex-col gap-4 w-1/2'>
            <label className='font-medium capitalize text-xl'>Last Name</label>
            <input
              type='text'
              name='lastName'
              onChange={handleChange}
              className='input_text text-lg font-medium'
              placeholder='Last Name'
            />
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <label className='font-medium capitalize text-xl'>username</label>
          <input
            type='text'
            name='username'
            onChange={handleChange}
            className='input_text text-lg font-medium'
            placeholder='Username'
          />
        </div>
        <div className='flex flex-col gap-4'>
          <label className='font-medium capitalize text-xl'>Email</label>
          <input
            type='email'
            name='email'
            onChange={handleChange}
            className='input_text font-medium text-lg'
            placeholder='Email Ex:- user@gmail.com'
          />
        </div>
        <div className='flex flex-col gap-4'>
          <label className='font-medium capitalize text-xl'>Password</label>
          <input
            type='password'
            name='password'
            onChange={handleChange}
            className='input_text font-medium text-lg'
            placeholder='***********'
          />
        </div>
        <div>
          <div>
            <span className='text-xl font-medium capitalize'>Account Type</span>
            <select
              name='account_type'
              id='account_type'
              className='font-lg ml-4'
              onChange={handleAccountChange}
            >
              <option className='font-lg' value={Roles.BASIC}>
                Personal
              </option>
              <option className='font-lg' value={Roles.ADMIN}>
                ADMIN
              </option>
            </select>
          </div>
          {adminAccount && (
            <div className='flex flex-col gap-4 mt-4'>
              <label className='text-xl font-medium capitalize'>
                Admin Key
              </label>
              <input
                type='password'
                name=''
                className='input_text font-medium'
                value={adminRefCode}
                placeholder='*********'
                onChange={(e) => {
                  setAdminRefCode(e.target.value);
                }}
              />
            </div>
          )}
        </div>
        <div>
          <p className='text-xl text-right'>
            Already Have an Account ?{' '}
            <Link to='/login' className='underline'>
              Login
            </Link>
          </p>
        </div>
        <div className='flex justify-center'>
          <input
            type='submit'
            value='SignUp'
            className='btn-green px-9 uppercase font-semibold text-lg'
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;
