import { apiClient, toApiError } from './api-client'

export interface AdminMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  isRead: boolean
  createdAt: string
}

export interface DashboardStats {
  messages: number
  unreadMessages: number
  recentMessages: AdminMessage[]
  project: number
  skill: number
  experience: number
  education: number
  blog: number
  visitor: number
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    const { data } = await apiClient.get<{ status: string; data: DashboardStats }>(
      '/admin/dashboard/stats',
    )
    return data.data
  } catch (error) {
    throw toApiError(error)
  }
}

export async function fetchMessages(): Promise<AdminMessage[]> {
  try {
    const { data } = await apiClient.get<{ status: string; data: { messages: AdminMessage[] } }>(
      '/admin/messages',
    )
    return data.data.messages
  } catch (error) {
    throw toApiError(error)
  }
}

export async function markMessageAsRead(id: string): Promise<AdminMessage> {
  try {
    const { data } = await apiClient.patch<{ status: string; data: { message: AdminMessage } }>(
      `/admin/messages/${id}/read`,
    )
    return data.data.message
  } catch (error) {
    throw toApiError(error)
  }
}

export async function deleteMessage(id: string): Promise<void> {
  try {
    await apiClient.delete(`/admin/messages/${id}`)
  } catch (error) {
    throw toApiError(error)
  }
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}
