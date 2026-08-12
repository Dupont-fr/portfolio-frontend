import { describe, expect, it } from 'vitest'
import { cn } from './cn'

describe('cn', () => {
  it('fusionne les classes', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c')
  })

  it('résout les conflits avec tailwind-merge', () => {
    expect(cn('px-2 px-4')).toBe('px-4')
    expect(cn('text-white text-black')).toBe('text-black')
  })

  it('ignore les valeurs falsy', () => {
    expect(cn('a', false, undefined, null, 0, 'b')).toBe('a b')
  })

  it('gère les objets conditionnels', () => {
    expect(cn({ 'font-bold': true, 'font-light': false })).toBe('font-bold')
  })
})
