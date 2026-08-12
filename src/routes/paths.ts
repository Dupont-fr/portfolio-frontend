export const PATHS = {
  home: '/',
  about: '/a-propos',
  skills: '/competences',
  projects: '/projets',
  projectDetail: (slug: string) => `/projets/${slug}`,
  services: '/services',
  journey: '/parcours',
  certifications: '/certifications',
  blog: '/blog',
  article: (slug: string) => `/blog/${slug}`,
  contact: '/contact',
  admin: {
    login: '/admin/login',
    root: '/admin',
    dashboard: '/admin/dashboard',
    projects: '/admin/projets',
    skills: '/admin/competences',
    educations: '/admin/formations',
    experiences: '/admin/experiences',
    blog: '/admin/blog',
    certifications: '/admin/certifications',
    messages: '/admin/messages',
    settings: '/admin/parametres',
  },
} as const

export type RoutePath = (typeof PATHS)[keyof typeof PATHS]
