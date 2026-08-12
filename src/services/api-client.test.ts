import axios from 'axios'
import { describe, expect, it } from 'vitest'
import { toApiError } from './api-client'

describe('toApiError', () => {
  it('retourne une erreur générique pour une erreur inconnue', () => {
    expect(toApiError(new Error('boom'))).toEqual({ status: 0, message: 'boom' })
  })

  it('retourne une erreur générique pour une valeur non-Error', () => {
    expect(toApiError('oups')).toEqual({ status: 0, message: 'Erreur inconnue' })
  })

  it('extrait le message du serveur pour une réponse d’erreur', () => {
    const axiosError = new axios.AxiosError(
      'Request failed',
      'ERR_BAD_REQUEST',
      undefined,
      undefined,
      { status: 422, data: { message: 'Champ invalide' } } as never,
    )
    const result = toApiError(axiosError)
    expect(result.status).toBe(422)
    expect(result.message).toBe('Champ invalide')
    expect(result.details).toEqual({ message: 'Champ invalide' })
  })

  it('retourne un message de réseau si aucune réponse', () => {
    const axiosError = new axios.AxiosError('Network Error', 'ERR_NETWORK')
    const result = toApiError(axiosError)
    expect(result.status).toBe(0)
    expect(result.message).toContain('Impossible de joindre')
  })

  it('retourne un message de délai dépassé', () => {
    const axiosError = new axios.AxiosError('timeout', 'ECONNABORTED')
    const result = toApiError(axiosError)
    expect(result.status).toBe(0)
    expect(result.message).toContain('trop de temps')
  })
})
