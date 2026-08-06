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
    period: '2025 — Aujourd’hui',
    title: 'Développeur Full Stack JavaScript',
    subtitle: 'Freelance · Projets personnels',
    description:
      'Après une formation intensive, je conçois et développe des applications web complètes — sites, plateformes et API — en appliquant les technologies de l’écosystème JavaScript sur des projets concrets.',
    current: true,
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
  },
] as const

export const EDUCATIONS: TimelineItem[] = [
  {
    period: '2023 — 2026',
    title: 'Licence en Informatique Fondamentale',
    subtitle: 'Université de Dschang · Cameroun',
    description:
      'Formation couvrant les fondements de l’informatique théorique et appliquée : algorithmique, programmation C et Java, génie logiciel, bases de données relationnelles, réseaux, systèmes d’exploitation et analyse de données.',
    tags: ['Algorithmique', 'C / Java', 'Bases de données', 'Génie logiciel'],
  },
  {
    period: 'Juin — Novembre 2025',
    title: 'Développement Full Stack JavaScript',
    subtitle: 'MO’OC Academy · Formation intensive',
    description:
      'Formation professionnelle intensive couvrant toute la chaîne de développement : frontend (React, TypeScript, Tailwind, Redux), backend (Node.js, Express, API REST, JWT, Zod) et bases de données (MongoDB, MySQL, PostgreSQL).',
    tags: ['React', 'Node.js', 'Express', 'TypeScript', 'MongoDB'],
  },
  {
    period: '2022 — 2023',
    title: 'Baccalauréat Scientifique',
    subtitle: 'Lycée de Bafou · Ouest Cameroun',
    description:
      'Obtention du baccalauréat scientifique, étape décisive qui a confirmé mon intérêt pour les sciences et les technologies et m’a conduit vers l’Université de Dschang.',
    tags: ['Mathématiques', 'Physique', 'Sciences'],
  },
] as const
