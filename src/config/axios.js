import axios from 'axios'
export const axiosi = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BASE_URL || 'https://hot-wheels-shop-backend.vercel.app/api/',
  });
  