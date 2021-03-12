import axios from 'axios'

const instance = axios.create()

instance.interceptors.request.use((config) => {
  config.headers.common['Authorization'] = 'Bearer ' + process.env.NEXT_PUBLIC_X_API_KEY
  return config
})

export default instance
