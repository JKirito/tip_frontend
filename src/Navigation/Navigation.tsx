import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../states/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../states/store';
import { Roles } from '../interface';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.user.role);
  const loginStatus = useSelector((state: RootState) => state.user.loginstatus);
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(logout());
    navigate('/login');
  };
  const location = useLocation();
  const naivagte = useNavigate();

  const goToHome = () => {
    if (location.pathname === '/signup' || location.pathname === '/login') {
      return;
    } else {
      navigate('/');
    }
  };
  return (
    <div className='flex justify-between'>
      <div className='flex text-3xl font-semibold'>
        <p className='flex cursor-pointer' onClick={goToHome}>
          <span className='text-blue-700'>Corp</span>
          <span className='text-green-500'>U</span>
        </p>
      </div>
      <div className='ml-auto flex space-x-6 text-xl justify-center items-center'>
        {loginStatus && (
          <Link to='/' className='hover:underline underline-offset-4'>
            Home
          </Link>
        )}

        {role && role === Roles.ADMIN ? (
          <>
            <Link
              to='/jobposts'
              className='hover:underline  underline-offset-4'
            >
              Post a Job
            </Link>
            <Link to='/manage' className='hover:underline  underline-offset-4'>
              Manage Jobs
            </Link>
          </>
        ) : null}

        {loginStatus && (
          <Link to='/profile' className='hover:underline  underline-offset-4'>
            Profile
          </Link>
        )}

        {loginStatus && (
          <button className='btn-green' onClick={handleLogout}>
            Log out
          </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
