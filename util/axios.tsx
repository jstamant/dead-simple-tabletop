import axios from 'axios'

const instance = axios.create()

// TODO implement NODE_ENV
instance.defaults.baseURL = 'http://localhost:3001';
instance.defaults.withCredentials = true;

export default instance
