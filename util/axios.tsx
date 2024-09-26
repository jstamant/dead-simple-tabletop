import axios from 'axios'

const instance = axios.create()

// TODO implement NODE_ENV
instance.defaults.baseURL = 'http://localhost:3001'

export default instance
