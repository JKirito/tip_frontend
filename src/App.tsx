import {
  createBrowserRouter,
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import ErrorPage from './ErrorPage/ErrorPage';
import { Provider, useDispatch } from 'react-redux';
import { store } from './states/store';
import Signup from './signup/Signup';
import Home from './Home/Home';
import { useEffect } from 'react';
import authorizedInstance from './axiosInstances/authInstance';
import { login } from './states/slices/userSlice';
import JobBoard from './jobBoard/JobBoard';
import JobPost from './jobBoard/JobPost';

function  App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const validate = async () => {
      console.log('validating data');
      await authorizedInstance
        .get('/validate')
        .then((res) => {
          // console.log(res.data);
          dispatch(
            login({
              loginstatus: true,
              username: res.data.username,
            })
          );
        })
        .catch((err) => {
          // dispatch(logout());
          if (location.pathname === '/signup') {
            return;
          } else {
            navigate('/login');
          }
        });
    };
    validate();
  }, []);
  return (
    // {/* <RouterProvider router={router}></RouterProvider> */}

    <Routes>
      <Route index path='/' element={<Home />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/jobs' element={<JobBoard />}></Route>
      <Route path='/jobposts' element={<JobPost />}></Route>
    </Routes>
  );
}

export default App;
