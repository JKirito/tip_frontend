import React, { useState } from 'react';
import baseInstance from '../axiosInstances/baseInstance';
import { useNavigate } from 'react-router-dom';
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
      <form onSubmit={handleSubmit}>
        <div>
          <label className='font-medium capitalize'>First Name</label>
          <input
            type='text'
            name='firstName'
            onChange={handleChange}
            className='input_text font-medium'
          />
        </div>
        <div>
          <label className='font-medium capitalize'>Last Name</label>
          <input
            type='text'
            name='lastName'
            onChange={handleChange}
            className='input_text font-medium'
          />
        </div>
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
          <label className='font-medium capitalize'>Email</label>
          <input
            type='email'
            name='email'
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
          <div>
            <span>Account Type</span>
            <select
              name='account_type'
              id='account_type'
              onChange={handleAccountChange}
              className='ml-4'
            >
              <option value={Roles.BASIC}>Personal</option>
              <option value={Roles.ADMIN}>ADMIN</option>
            </select>
          </div>
          {adminAccount && (
            <div>
              <label>Admin Secret</label>
              <input
                type='text'
                name=''
                className='input_text font-medium'
                value={adminRefCode}
                onChange={(e) => {
                  setAdminRefCode(e.target.value);
                }}
              />
            </div>
          )}
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
