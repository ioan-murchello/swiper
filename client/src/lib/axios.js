import axios from 'axios';  

const BASE_URL= import.meta.env.MODE === 'development' ? 'http://localhost:5001/api' : "https://zingy-torte-43b057.netlify.app/";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default instance;