import axios from 'axios';

const authorizedInstance = axios.create({
  baseURL: `http://localhost:4000`,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default authorizedInstance;
