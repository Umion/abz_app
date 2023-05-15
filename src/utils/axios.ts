import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { authStore } from '@/stores/auth'

export const baseURL = import.meta.env.VITE_API_HOST || 'http://localhost:5173'

export const defHttp = axios.create({ baseURL })

defHttp.defaults.headers.common = {
  Accept: 'application/json'
}

const requestHandler = async (config: InternalAxiosRequestConfig<any>) => {
  const auth = authStore()
  if (auth.getToken) {
    config.headers['Token'] = `${auth.getToken}`
  }
  return config
}

const responseHandler = (response: AxiosResponse<any, any>) => {
  return response
}

const errorHandler = async (error: any) => {
  // if (error.response.status === 401)
  // if error, remove session
  // redirect to login

  return Promise.reject(error)
}

defHttp.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
)

defHttp.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
)

export default defHttp
