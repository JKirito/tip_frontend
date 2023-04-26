import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { checkValidation } from '../utils/ProtectedRoute';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../states/slices/userSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <div>
      <h1>HOME</h1>
      <Link to='/jobs' className='linkbtn'>
        view Jobs
      </Link>
      <Link to='/jobposts' className='linkbtn ml-3'>
        Post A Job
      </Link>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
