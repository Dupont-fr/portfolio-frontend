import { apiClient } from './api-client'
import type {
  BlogItem,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SkillItem,
} from './admin'

interface ListResponse<T> {
  status: string
  data: Record<string, T[]>
}

interface ItemResponse<T> {
  status: string
  data: Record<string, T>
}

async function list<T>(resource: string, key: string): Promise<T[]> {
  const { data } = await apiClient.get<ListResponse<T>>(`/${resource}`)
  return data.data[key]
}

async function getBySlug<T>(resource: string, key: string, slug: string): Promise<T> {
  const { data } = await apiClient.get<ItemResponse<T>>(`/${resource}/${slug}`)
  return data.data[key]
}

export function fetchPublicProjects(): Promise<ProjectItem[]> {
  return list<ProjectItem>('projects', 'projects')
}

export function fetchPublicProjectBySlug(slug: string): Promise<ProjectItem> {
  return getBySlug<ProjectItem>('projects', 'project', slug)
}

export function fetchPublicSkills(): Promise<SkillItem[]> {
  return list<SkillItem>('skills', 'skills')
}

export function fetchPublicEducations(): Promise<EducationItem[]> {
  return list<EducationItem>('educations', 'educations')
}

export function fetchPublicExperiences(): Promise<ExperienceItem[]> {
  return list<ExperienceItem>('experiences', 'experiences')
}

export function fetchPublicBlogPosts(): Promise<BlogItem[]> {
  return list<BlogItem>('blog', 'blogs')
}

export function fetchPublicBlogPostBySlug(slug: string): Promise<BlogItem> {
  return getBySlug<BlogItem>('blog', 'blog', slug)
}
