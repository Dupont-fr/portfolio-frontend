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
  certification: number
  visitor: number
}

export interface CrudItem {
  id: string
  [key: string]: unknown
}

export interface CrudApi<T extends CrudItem> {
  list: () => Promise<T[]>
  create: (input: Record<string, unknown>) => Promise<T>
  update: (id: string, input: Record<string, unknown>) => Promise<T>
  remove: (id: string) => Promise<void>
}

function createCrudApi<T extends CrudItem>(resource: string, singular: string): CrudApi<T> {
  return {
    async list() {
      try {
        const { data } = await apiClient.get<{ status: string; data: Record<string, T[]> }>(
          `/admin/${resource}`,
        )
        return data.data[singular]
      } catch (error) {
        throw toApiError(error)
      }
    },
    async create(input) {
      try {
        const { data } = await apiClient.post<{ status: string; data: Record<string, T> }>(
          `/admin/${resource}`,
          input,
        )
        return data.data[singular]
      } catch (error) {
        throw toApiError(error)
      }
    },
    async update(id, input) {
      try {
        const { data } = await apiClient.patch<{ status: string; data: Record<string, T> }>(
          `/admin/${resource}/${id}`,
          input,
        )
        return data.data[singular]
      } catch (error) {
        throw toApiError(error)
      }
    },
    async remove(id) {
      try {
        await apiClient.delete(`/admin/${resource}/${id}`)
      } catch (error) {
        throw toApiError(error)
      }
    },
  }
}

export interface SkillItem extends CrudItem {
  name: string
  category?: string | null
  icon?: string | null
  level: number
  order: number
  isPublished: boolean
}

export interface EducationItem extends CrudItem {
  school: string
  degree: string
  field?: string | null
  description?: string | null
  tags?: string[] | null
  startDate: string
  endDate?: string | null
  isCurrent: boolean
  order: number
}

export interface ExperienceItem extends CrudItem {
  company: string
  role: string
  location?: string | null
  description?: string | null
  tags?: string[] | null
  startDate: string
  endDate?: string | null
  isCurrent: boolean
  order: number
}

export interface ProjectItem extends CrudItem {
  title: string
  slug: string
  description: string
  longDescription?: string | null
  year?: string | null
  role?: string | null
  stack?: string[] | null
  features?: string[] | null
  outcomes?: string[] | null
  coverImage?: string | null
  githubUrl?: string | null
  liveUrl?: string | null
  category?: string | null
  featured: boolean
  isPublished: boolean
  order: number
}

export interface BlogItem extends CrudItem {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string | null
  tags?: string[] | null
  isPublished: boolean
  publishedAt?: string | null
  order: number
}

export interface CertificationItem extends CrudItem {
  title: string
  issuer: string
  issuedAt: string
  description?: string | null
  credentialId?: string | null
  url?: string | null
  tags?: string[] | null
  isPublished: boolean
  order: number
}

export const skillsApi = createCrudApi<SkillItem>('skills', 'skill')
export const educationsApi = createCrudApi<EducationItem>('educations', 'education')
export const experiencesApi = createCrudApi<ExperienceItem>('experiences', 'experience')
export const projectsApi = createCrudApi<ProjectItem>('projects', 'project')
export const blogsApi = createCrudApi<BlogItem>('blog', 'blog')
export const certificationsApi = createCrudApi<CertificationItem>('certifications', 'certification')

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

export interface VisitDayCount {
  date: string
  count: number
}

export interface TopPage {
  path: string
  count: number
}

export interface RecentVisit {
  id: string
  path: string
  ip: string
  createdAt: string
}

export interface VisitStats {
  totalVisitors: number
  totalPageViews: number
  last14Days: VisitDayCount[]
  topPages: TopPage[]
  recentVisits: RecentVisit[]
}

export async function fetchVisitStats(): Promise<VisitStats> {
  try {
    const { data } = await apiClient.get<{ status: string; data: VisitStats }>(
      '/admin/stats/visits',
    )
    return data.data
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
