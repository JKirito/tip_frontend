import React, { useEffect } from 'react';
// import { checkValidation } from '../utils/ProtectedRoute';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>HOME</h1>
      <Link to='/jobs' className='linkbtn'>
        view Jobs
      </Link>
      <Link to='/jobposts' className='linkbtn'>
        Post A Job
      </Link>
    </div>
  );
};

export default Home;
