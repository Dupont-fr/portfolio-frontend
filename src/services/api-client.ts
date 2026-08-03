import axios from 'axios'

export const API_BASE_URL: string =
  (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:5000/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export interface ApiError {
  status: number
  message: string
  details?: unknown
}

export function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    return {
      status: error.response?.status ?? 0,
      message:
        (error.response?.data as { message?: string } | undefined)?.message ??
        error.message,
      details: error.response?.data,
    }
  }
  return { status: 0, message: error instanceof Error ? error.message : 'Erreur inconnue' }
}
