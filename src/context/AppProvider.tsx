import { useEffect, type ReactNode } from 'react'
import { useUIStore } from '@/store/ui-store'

const MIN_SPLASH_MS = 600

export function AppProvider({ children }: { children: ReactNode }) {
  const setPreloaderDone = useUIStore((state) => state.setPreloaderDone)

  useEffect(() => {
    const finish = () => window.setTimeout(() => setPreloaderDone(true), MIN_SPLASH_MS)

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish, { once: true })
    }

    return () => window.removeEventListener('load', finish)
  }, [setPreloaderDone])

  return <>{children}</>
}
