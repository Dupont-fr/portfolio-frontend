import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AdminLayout } from '@/layouts/AdminLayout'
import { MainLayout } from '@/layouts/MainLayout'
import { AuthGuard } from '@/components/admin/AuthGuard'
import { PATHS } from '@/routes/paths'
import { AdminLoginPage } from '@/pages/AdminLoginPage'
import { AboutPage } from '@/pages/AboutPage'
import { BlogArticlePage } from '@/pages/BlogArticlePage'
import { BlogPage } from '@/pages/BlogPage'
import { CertificationsPage } from '@/pages/CertificationsPage'
import { ContactPage } from '@/pages/ContactPage'
import { HomePage } from '@/pages/HomePage'
import { JourneyPage } from '@/pages/JourneyPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { ServicesPage } from '@/pages/ServicesPage'
import { SkillsPage } from '@/pages/SkillsPage'
import { DashboardPage } from '@/pages/admin/DashboardPage'
import { EducationsAdminPage } from '@/pages/admin/EducationsAdminPage'
import { ExperiencesAdminPage } from '@/pages/admin/ExperiencesAdminPage'
import { MessagesAdminPage } from '@/pages/admin/MessagesAdminPage'
import { ProjectsAdminPage } from '@/pages/admin/ProjectsAdminPage'
import { SettingsAdminPage } from '@/pages/admin/SettingsAdminPage'
import { SkillsAdminPage } from '@/pages/admin/SkillsAdminPage'
import { BlogAdminPage } from '@/pages/admin/BlogAdminPage'
import { CertificationsAdminPage } from '@/pages/admin/CertificationsAdminPage'
import { trackVisit } from '@/services/visits'

export function AppRouter() {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.startsWith(PATHS.admin.root)) return
    void trackVisit(location.pathname)
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path={PATHS.about} element={<AboutPage />} />
            <Route path={PATHS.skills} element={<SkillsPage />} />
            <Route path={PATHS.projects} element={<ProjectsPage />} />
            <Route path="projets/:slug" element={<ProjectDetailPage />} />
            <Route path={PATHS.services} element={<ServicesPage />} />
            <Route path={PATHS.journey} element={<JourneyPage />} />
            <Route path={PATHS.certifications} element={<CertificationsPage />} />
            <Route path={PATHS.blog} element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogArticlePage />} />
            <Route path={PATHS.contact} element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path={PATHS.admin.login} element={<AdminLoginPage />} />
          <Route
            path={PATHS.admin.root}
            element={
              <AuthGuard>
                <AdminLayout />
              </AuthGuard>
            }
          >
            <Route index element={<Navigate to={PATHS.admin.dashboard} replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="projets" element={<ProjectsAdminPage />} />
            <Route path="competences" element={<SkillsAdminPage />} />
            <Route path="formations" element={<EducationsAdminPage />} />
            <Route path="experiences" element={<ExperiencesAdminPage />} />
            <Route path="blog" element={<BlogAdminPage />} />
            <Route path="certifications" element={<CertificationsAdminPage />} />
            <Route path="messages" element={<MessagesAdminPage />} />
            <Route path="parametres" element={<SettingsAdminPage />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}
