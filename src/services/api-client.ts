import axios from 'axios'

const DEFAULT_API_URL = 'http://localhost:5000/api'

export function normalizeApiBaseUrl(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, '')
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`
}

export const API_BASE_URL: string = normalizeApiBaseUrl(
  (import.meta.env.VITE_API_URL as string | undefined) ?? DEFAULT_API_URL,
)

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
    if (error.code === 'ECONNABORTED') {
      return {
        status: 0,
        message: 'Le serveur met trop de temps à répondre. Vérifiez votre connexion puis réessayez.',
      }
    }
    if (error.code === 'ERR_NETWORK' || !error.response) {
      return {
        status: 0,
        message: 'Impossible de joindre le serveur. Vérifiez votre connexion internet puis réessayez.',
      }
    }
    return {
      status: error.response.status,
      message:
        (error.response.data as { message?: string } | undefined)?.message ??
        error.message,
      details: error.response.data,
    }
  }
  return { status: 0, message: error instanceof Error ? error.message : 'Erreur inconnue' }
}
