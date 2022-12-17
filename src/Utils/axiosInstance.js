import axios from 'axios';
import accessLocalStorage from './accessLocalStorage';

const getAccessToken = () => {
 const token = accessLocalStorage.getFromLs('token');
 if(token) {
  return `Beare ${token}`;
 } else {
  return ``;
 }
};

axios.interceptors.response.use(function(err) {
  if(err.response.data.message.toLowwerCase() === 'token expired') {
    window.history.replaceState('/sign-in')
  } 
})

const axiosInstance = axios.create({
  baseURL : 'https://luka-api.vercel.app',
  headers: {
    Authorization: getAccessToken(),
    "Content-Type": "application/json",
    timeout : 1000,
  }, 
});

export default axiosInstance;