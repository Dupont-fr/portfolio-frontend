import { apiClient, toApiError } from './api-client'

const AI_TIMEOUT_MS = 120_000

export interface GenerateArticleInput {
  topic: string
  tone?: string
  language?: string
}

export interface GeneratedArticle {
  title: string
  excerpt: string
  content: string
  tags: string[]
}

export interface GeneratedProject {
  title: string
  category: string
  role: string
  year: string
  description: string
  longDescription: string
  stack: string[]
  features: string[]
  outcomes: string[]
}

export async function generateArticleWithAi(input: GenerateArticleInput): Promise<GeneratedArticle> {
  try {
    const { data } = await apiClient.post<{ status: string; data: GeneratedArticle }>(
      '/admin/ai/generate-article',
      input,
      { timeout: AI_TIMEOUT_MS },
    )
    return data.data
  } catch (error) {
    throw toApiError(error)
  }
}

export async function generateProjectWithAi(description: string): Promise<GeneratedProject> {
  try {
    const { data } = await apiClient.post<{ status: string; data: GeneratedProject }>(
      '/admin/ai/generate-project',
      { description },
      { timeout: AI_TIMEOUT_MS },
    )
    return data.data
  } catch (error) {
    throw toApiError(error)
  }
}

export async function rewriteWithAi(text: string, instructions?: string): Promise<string> {
  try {
    const { data } = await apiClient.post<{ status: string; data: { text: string } }>(
      '/admin/ai/rewrite',
      { text, instructions },
      { timeout: AI_TIMEOUT_MS },
    )
    return data.data.text
  } catch (error) {
    throw toApiError(error)
  }
}

export async function suggestTagsWithAi(content: string): Promise<string[]> {
  try {
    const { data } = await apiClient.post<{ status: string; data: { tags: string[] } }>(
      '/admin/ai/suggest-tags',
      { content },
      { timeout: AI_TIMEOUT_MS },
    )
    return data.data.tags
  } catch (error) {
    throw toApiError(error)
  }
}