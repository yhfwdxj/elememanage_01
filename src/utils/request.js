import axios from 'axios'
export const baseURL = 'https://elm.cangdu.org/'
export const baseImgPath = 'https://elm.cangdu.org/img/'
const instance = axios.create({
  baseURL,
  timeout: 8000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

instance.interceptors.request.use((config) => {
  return config
}, (err) => {
  return Promise.reject(err)
})

instance.interceptors.response.use((response) => {
  return response.data
}, (err) => {
  return Promise.reject(err)
})

export default instance