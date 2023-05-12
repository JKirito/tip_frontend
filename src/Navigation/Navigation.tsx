import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className='flex justify-between'>
      <div className='flex text-2xl font-semibold'>
        <Link to='/' className='flex'>
          <p className='text-blue-700'>Corp</p>
          <span className='text-green-500'>U</span>
        </Link>
      </div>
      <div className='ml-auto flex space-x-6'>
        <Link to='/'>Home</Link>
        <Link to='/jobposts'>Post a Job</Link>
        <Link to='/jobs'>Jobs</Link>
      </div>
    </div>
  );
};

export default Navigation;
