import { Outlet } from 'react-router-dom'
import { BackgroundFX } from '@/layouts/BackgroundFX'
import { Footer } from '@/layouts/Footer'
import { Navbar } from '@/layouts/Navbar'
import { ScrollToTop } from '@/components/ScrollToTop'

export function MainLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <ScrollToTop />
      <BackgroundFX />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
