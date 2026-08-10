import {
  BarChart3,
  CalendarDays,
  MessageSquare,
  ServerCog,
  ShoppingBag,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type ProjectCategory = 'fullstack' | 'frontend' | 'backend' | 'ecommerce'

export interface ProjectCategoryInfo {
  slug: ProjectCategory
  label: string
}

export interface Project {
  slug: string
  title: string
  category: string
  year: string
  role: string
  description: string
  longDescription: string
  stack: string[]
  features: string[]
  outcomes: string[]
  icon: LucideIcon
  gradient: string
  featured?: boolean
  githubUrl?: string
  liveUrl?: string
}

export const PROJECT_CATEGORIES: ProjectCategoryInfo[] = [
  { slug: 'fullstack', label: 'Full Stack' },
  { slug: 'frontend', label: 'Frontend' },
  { slug: 'backend', label: 'Backend' },
  { slug: 'ecommerce', label: 'E-commerce' },
] as const

export const PROJECTS: Project[] = [
  {
    slug: 'nexus-dashboard',
    title: 'Nexus Dashboard',
    category: 'fullstack',
    year: '2024',
    role: 'Lead Développeur Full Stack',
    description:
      'Dashboard analytique temps réel avec visualisations interactives, rôles et permissions avancés.',
    longDescription:
      'Nexus Dashboard est une plateforme d’analyse qui agrège les données de plusieurs sources en un unique espace. Les équipes suivent leurs indicateurs clés en temps réel grâce à des graphiques interactifs, des alertes personnalisées et des rapports exportables. Un système de rôles et permissions fin permet de contrôler précisément l’accès aux données.',
    stack: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'WebSockets', 'TailwindCSS'],
    features: [
      'Visualisations interactives en temps réel',
      'Rôles et permissions granulaires',
      'Alertes et notifications personnalisées',
      'Export des rapports (PDF / CSV)',
      'Mode sombre et thème premium',
    ],
    outcomes: [
      'Réduction de 60 % du temps de prise de décision des équipes',
      'Adoption par plus de 150 utilisateurs actifs',
      'Score Lighthouse supérieur à 95 sur mobile et desktop',
    ],
    icon: BarChart3,
    gradient: 'from-primary/40 via-secondary/20 to-transparent',
    featured: true,
    githubUrl: 'https://github.com/Dupont-fr',
    liveUrl: 'https://github.com/Dupont-fr',
  },
  {
    slug: 'aurora-commerce',
    title: 'Aurora Commerce',
    category: 'ecommerce',
    year: '2024',
    role: 'Développeur Full Stack',
    description:
      'Plateforme e-commerce headless : panier fluide, paiement sécurisé et gestion de catalogue complète.',
    longDescription:
      'Aurora Commerce est une boutique en ligne headless pensée pour la performance et la conversion. Le panier est entièrement fluide côté client, le paiement est géré de manière sécurisée via Stripe, et un back-office complet permet de gérer le catalogue, les stocks et les commandes sans effort.',
    stack: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma', 'TailwindCSS'],
    features: [
      'Panier instantané sans rechargement',
      'Paiement sécurisé via Stripe',
      'Back-office de gestion du catalogue',
      'Recherche et filtres avancés',
      'SEO optimisé pour le référencement',
    ],
    outcomes: [
      'Augmentation de 38 % du taux de conversion',
      'Temps de chargement moyen de 1,2 seconde',
      'Gestion autonome du catalogue par le client',
    ],
    icon: ShoppingBag,
    gradient: 'from-secondary/40 via-primary/20 to-transparent',
    featured: true,
    githubUrl: 'https://github.com/Dupont-fr',
    liveUrl: 'https://github.com/Dupont-fr',
  },
  {
    slug: 'pulse-chat',
    title: 'Pulse Chat',
    category: 'fullstack',
    year: '2023',
    role: 'Développeur Full Stack',
    description:
      'Application de messagerie temps réel avec présence, notifications et chiffrement de bout en bout.',
    longDescription:
      'Pulse Chat est une application de messagerie instantanée qui met l’accent sur la fluidité et la confidentialité. Les messages transitent en temps réel via WebSockets, la présence des utilisateurs est synchronisée en continu, et un chiffrement de bout en bout protège les conversations sensibles.',
    stack: ['React', 'Socket.io', 'Express', 'Redis', 'JWT'],
    features: [
      'Messagerie temps réel via WebSockets',
      'Indicateur de présence et de saisie',
      'Notifications push et sonores',
      'Chiffrement de bout en bout',
      'Historique et recherche de messages',
    ],
    outcomes: [
      'Latence moyenne des messages inférieure à 200 ms',
      'Support de plus de 1 000 connexions simultanées',
      'Zéro incident de sécurité rapporté',
    ],
    icon: MessageSquare,
    gradient: 'from-accent/30 via-secondary/20 to-transparent',
    featured: true,
    githubUrl: 'https://github.com/Dupont-fr',
    liveUrl: 'https://github.com/Dupont-fr',
  },
  {
    slug: 'elysium-events',
    title: 'Élysium Events',
    category: 'frontend',
    year: '2023',
    role: 'Développeur Frontend',
    description:
      'Plateforme événementielle avec billetterie, galerie immersive et expérience visuelle soignée.',
    longDescription:
      'Élysium Events est une plateforme dédiée à l’organisation d’événements. Elle combine une billetterie simple, une galerie immersive et des animations soignées qui donnent vie à chaque page. Le site est entièrement responsive et offre une expérience fluide sur tous les appareils.',
    stack: ['React', 'TypeScript', 'Framer Motion', 'TailwindCSS'],
    features: [
      'Billetterie en ligne avec QR code',
      'Galerie interactive et immersive',
      'Animations micro-interactions premium',
      'Design entièrement responsive',
      'Accessibilité (WCAG AA)',
    ],
    outcomes: [
      'Note de satisfaction utilisateurs de 4,8/5',
      'Réduction de 40 % du taux de rebond',
      'Site 100 % accessible sur mobile',
    ],
    icon: CalendarDays,
    gradient: 'from-primary/30 via-accent/20 to-transparent',
  },
  {
    slug: 'streamline-api',
    title: 'Streamline API',
    category: 'backend',
    year: '2022',
    role: 'Développeur Backend',
    description:
      'API REST robuste avec authentification JWT, documentation OpenAPI et couverture de tests complète.',
    longDescription:
      'Streamline API est le socle technique de plusieurs applications : une API REST sécurisée, documentée et testée. Elle centralise l’authentification JWT, la gestion des utilisateurs et les ressources métier, avec une architecture en couches facile à maintenir et à faire évoluer.',
    stack: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Jest'],
    features: [
      'API REST RESTful versionnée',
      'Authentification JWT sécurisée',
      'Documentation OpenAPI interactive',
      'Couverture de tests supérieure à 90 %',
      'Gestion centralisée des erreurs',
    ],
    outcomes: [
      'Intégration en 2 semaines dans 3 applications',
      'Réduction de 50 % du temps de développement back',
      'Couverture de tests supérieure à 90 %',
    ],
    icon: ServerCog,
    gradient: 'from-secondary/30 via-primary/20 to-transparent',
    githubUrl: 'https://github.com/Dupont-fr',
  },
  {
    slug: 'verdant-crm',
    title: 'Verdant CRM',
    category: 'fullstack',
    year: '2022',
    role: 'Développeur Full Stack',
    description:
      'CRM de gestion client avec pipelines, tableaux de bord et suivi des opportunités commerciales.',
    longDescription:
      'Verdant CRM accompagne les équipes commerciales dans la gestion de leurs contacts et opportunités. Des pipelines visuels permettent de suivre chaque affaire, des tableaux de bord synthétisent l’activité, et les notifications gardent tout le monde informé en temps réel.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Prisma', 'Recharts'],
    features: [
      'Pipelines commerciaux visuels',
      'Tableaux de bord et rapports',
      'Gestion des contacts et des équipes',
      'Notifications et rappels',
      'Import / export de données',
    ],
    outcomes: [
      'Centralisation de plus de 5 000 contacts',
      'Augmentation de 25 % du taux de closing',
      'Gain de 10 heures administratives par semaine',
    ],
    icon: Users,
    gradient: 'from-accent/25 via-primary/20 to-transparent',
  },
] as const

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured) as Project[]
