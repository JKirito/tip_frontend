import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className='flex justify-between'>
      <div className='flex text-3xl font-semibold'>
        <Link to='/' className='flex'>
          <p className='text-blue-700'>Corp</p>
          <span className='text-green-500'>U</span>
        </Link>
      </div>
      <div className='ml-auto flex space-x-6 text-xl'>
        <Link to='/' className='hover:underline underline-offset-4'>
          Home
        </Link>
        <Link to='/jobposts' className='hover:underline  underline-offset-4'>
          Post a Job
        </Link>
        <Link to='/jobs' className='hover:underline  underline-offset-4'>
          Jobs
        </Link>
        <Link to='/manage' className='hover:underline  underline-offset-4'>
          Manage Jobs
        </Link>
        <Link to='/profile' className='hover:underline  underline-offset-4'>
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
