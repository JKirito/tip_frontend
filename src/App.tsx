import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import ErrorPage from './ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <div className='app'>Base here</div>,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
