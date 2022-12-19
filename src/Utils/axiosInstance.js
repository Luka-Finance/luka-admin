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

const axiosInstance = axios.create({
  baseURL : 'https://luka-api.vercel.app',
  headers: {
    Authorization: getAccessToken(),
    "Content-Type": "application/json",
    timeout : 1000,
  }, 
});

// axiosInstance.interceptors.response.use(function(err) {
//   if(err.response.data.message.toLowwerCase() === 'token expired') {
//     console.log('expired token')
//     // window.history.replaceState('/sign-in')
//   } else {
//     console.log('expired token')
//   }
// }, function(error) {
//    return Promise.reject(error);
// })

export default axiosInstance;