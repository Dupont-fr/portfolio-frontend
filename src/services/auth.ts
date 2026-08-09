import { apiClient, toApiError } from './api-client'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
}

export const TOKEN_KEY = 'access_token'
const USER_KEY = 'admin_user'

export async function loginRequest(
  email: string,
  password: string,
): Promise<{ token: string; user: AuthUser }> {
  try {
    const { data } = await apiClient.post<{ status: string; data: { token: string; user: AuthUser } }>(
      '/auth/login',
      { email, password },
    )
    return data.data
  } catch (error) {
    throw toApiError(error)
  }
}

export async function fetchMe(): Promise<AuthUser> {
  const { data } = await apiClient.get<{ status: string; data: { user: AuthUser } }>('/auth/me')
  return data.data.user
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUser
  } catch {
    return null
  }
}

export function storeSession(token: string, user: AuthUser): void {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}
