import { apiClient } from './api-client'

export async function trackVisit(path: string, referrer?: string): Promise<void> {
  try {
    await apiClient.post('/visits', { path, referrer })
  } catch {
    // Le suivi des visites ne doit jamais bloquer la navigation.
  }
}
