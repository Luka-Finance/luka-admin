import axios from 'axios';

const getAccessToken = () => {
 const token = localStorage.getItem('token');
 if(token) {
  return `Beare ${token}`;
 } else {
  return ` `;
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

export default axiosInstance;