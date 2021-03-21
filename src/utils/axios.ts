import axios from 'axios'
// import { X_API_KEY } from 'utils/env'

const instance = axios.create()

instance.interceptors.request.use((config) => {
  // config.headers.common['Authorization'] = 'Bearer ' + X_API_KEY
  return config
})

export default instance
