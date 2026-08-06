export interface TimelineItem {
  period: string
  title: string
  subtitle: string
  description: string
  current?: boolean
  tags: string[]
}

export const EXPERIENCES: TimelineItem[] = [
  {
    period: '2023 — Aujourd’hui',
    title: 'Développeur Full Stack Freelance',
    subtitle: 'Indépendant · Cameroun',
    description:
      'Conception et développement d’applications web complètes pour des clients variés : sites vitrines, plateformes, dashboards et e-commerce.',
    current: true,
    tags: ['React', 'Node.js', 'MongoDB', 'UI Design'],
  },
  {
    period: '2021 — 2023',
    title: 'Développeur Web',
    subtitle: 'Entreprise · Cameroun',
    description:
      'Création d’interfaces et d’API, participation à la refonte d’applications internes et amélioration des performances.',
    tags: ['JavaScript', 'Express', 'PostgreSQL'],
  },
  {
    period: '2019 — 2021',
    title: 'Intégrateur / Développeur Junior',
    subtitle: 'Agence web · Cameroun',
    description:
      'Intégration de maquettes, développement de templates et premiers projets full stack.',
    tags: ['HTML/CSS', 'JavaScript', 'Git'],
  },
] as const

export const EDUCATIONS: TimelineItem[] = [
  {
    period: '2023',
    title: 'Certification React / Node.js',
    subtitle: 'Formation certifiante en ligne',
    description:
      'Spécialisation en développement d’applications web modernes avec l’écosystème JavaScript.',
    tags: ['React', 'Node.js', 'TypeScript'],
  },
  {
    period: '2021 — 2024',
    title: 'Licence en Informatique',
    subtitle: 'Université · Cameroun',
    description:
      'Fondamentaux de l’algorithmique, des bases de données et du génie logiciel.',
    tags: ['Algorithmique', 'Bases de données', 'Génie logiciel'],
  },
] as const
