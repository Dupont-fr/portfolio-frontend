import { apiClient, toApiError, type ApiError } from './api-client'

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactMessage(payload: ContactPayload): Promise<ApiError | null> {
  try {
    await apiClient.post('/messages', payload)
    return null
  } catch (error) {
    return toApiError(error)
  }
}
