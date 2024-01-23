import axios, { AxiosError } from 'axios'
const { VITE_BASE_URL: baseURL } = import.meta.env

let token: string = localStorage.getItem('dOToken') || null
export const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  formSerializer: {
    indexes: null,
  },
})

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  // localStorage.getItem("token") &&
  // (config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`);
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    // If the request was successful, return the response
    return response
  },
  (error: AxiosError<{detail: string}>) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.detail !== 'No active account found with the given credentials'
    ) {
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)
