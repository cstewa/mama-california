import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3000/api/v1' : '/api/v1')

const api = axios.create({ baseURL: BASE_URL })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('mama_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getEvents    = (params) => api.get('/events', { params })
export const getEvent     = (id)     => api.get(`/events/${id}`)
export const getNews      = (params) => api.get('/news', { params })
export const getResources = (params) => api.get('/resources', { params })
export const getChapters  = ()       => api.get('/chapters')
export const getSpeakers  = ()       => api.get('/speakers')
export const submitContact = (data)  => api.post('/contact', data)
export const signup        = (data)  => api.post('/members/signup', data)
export const login         = (data)  => api.post('/auth/login', data)

export default api
