import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { checkValidation } from '../utils/ProtectedRoute';
import { useNavigate, Link } from 'react-router-dom';
import { login, logout } from '../states/slices/userSlice';
import JobBoard from '../jobBoard/JobBoard';
import authorizedInstance from '../axiosInstances/authInstance';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <div className='mt-5'>
        <JobBoard />
      </div>
    </div>
  );
};

export default Home;
