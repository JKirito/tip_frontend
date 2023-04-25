import { useDispatch, useSelector } from 'react-redux';
import authorizedInstance from '../axiosInstances/authInstance';
import { login } from '../states/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../states/store';

// Experimental will try to implement later.
//
// export const checkValidation = async () => {
//   const token = localStorage.getItem('token');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state: RootState) => state.user);
//   const loginStatus = useSelector((state: RootState) => state.user.loginstatus);

//   await authorizedInstance
//     .get('/validate')
//     .then((res) => {
//       // console.log(res.data);
//       dispatch(
//         login({
//           loginstatus: true,
//           username: res.data.username,
//         })
//       );
//     })
//     .catch((err) => {
//       // dispatch(logout());
//       navigate('/login');
//     });
// };
