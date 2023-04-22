import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import ErrorPage from './ErrorPage/ErrorPage';
import { Provider } from 'react-redux';
import { store } from './states/store';

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
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
