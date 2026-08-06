import { MonitorSmartphone, Server, Layers, ShoppingBag, RefreshCw, Wrench, type LucideIcon } from 'lucide-react'

export interface Service {
  title: string
  description: string
  icon: LucideIcon
  features: string[]
}

export const SERVICES: Service[] = [
  {
    title: 'Développement Frontend',
    description:
      'Des interfaces élégantes, rapides et accessibles, pensées pour offrir une expérience utilisateur premium.',
    icon: MonitorSmartphone,
    features: ['React / Next.js', 'Animations Framer Motion', 'Responsive & accessible'],
  },
  {
    title: 'Développement Backend',
    description:
      'Des API robustes et sécurisées, avec une architecture propre et des bases de données optimisées.',
    icon: Server,
    features: ['API REST / GraphQL', 'Authentification JWT', 'MongoDB / PostgreSQL'],
  },
  {
    title: 'Applications Full Stack',
    description:
      'De l’idée au déploiement : un produit complet, évolutif et maintenable, pensé pour durer.',
    icon: Layers,
    features: ['MVP à part entière', 'Clean Architecture', 'Déploiement & monitoring'],
  },
  {
    title: 'Boutique en ligne',
    description:
      'Des sites e-commerce performants avec un tunnel d’achat fluide et un paiement sécurisé.',
    icon: ShoppingBag,
    features: ['Catalogue & panier', 'Paiement sécurisé', 'Back-office de gestion'],
  },
  {
    title: 'Refonte & Optimisation',
    description:
      'Audit technique, amélioration des performances et modernisation de vos applications existantes.',
    icon: RefreshCw,
    features: ['Audit technique', 'Core Web Vitals', 'Modernisation du stack'],
  },
  {
    title: 'Maintenance & Support',
    description:
      'Un accompagnement continu pour garantir la stabilité et l’évolution de vos projets.',
    icon: Wrench,
    features: ['Correctifs & mises à jour', 'Monitoring', 'Accompagnement'],
  },
] as const

export interface ProcessStep {
  step: string
  title: string
  description: string
}

export const PROCESS: ProcessStep[] = [
  {
    step: '01',
    title: 'Découverte',
    description: 'Échange sur le projet, les objectifs, les utilisateurs et les contraintes.',
  },
  {
    step: '02',
    title: 'Conception',
    description: 'Maquettage, architecture technique et choix des technologies adaptées.',
  },
  {
    step: '03',
    title: 'Développement',
    description: 'Itérations régulières avec des démos fonctionnelles et vos retours.',
  },
  {
    step: '04',
    title: 'Livraison',
    description: 'Tests, déploiement, documentation et support post-livraison.',
  },
] as const
