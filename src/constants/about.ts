import { ShieldCheck, Zap, Palette, GraduationCap, type LucideIcon } from 'lucide-react'

export const STATS = [
  { value: '1+', label: "Années d'expérience" },
  { value: '5+', label: 'Projets livrés' },
  { value: '5+', label: 'Clients satisfaits' },
] as const

export const BIO_PARAGRAPHS = [
  'Développeur Full Stack JavaScript passionné par le design d’interfaces et les architectures robustes, j’accompagne les équipes de l’idée au déploiement.',
  'Mon approche mêle exigence technique et sens du détail : des expériences utilisateur fluides, des performances maîtrisées et un code maintenable, testé et documenté.',
  'Curieux et en veille permanente, j’aime expérimenter les technologies récentes pour proposer des solutions à la fois modernes et durables.',
] as const

export interface Value {
  title: string
  description: string
  icon: LucideIcon
}

export const VALUES: Value[] = [
  {
    title: 'Qualité d’abord',
    description:
      'Code propre, typé, testé et documenté. Je privilégie la durabilité sur la vitesse.',
    icon: ShieldCheck,
  },
  {
    title: 'Performance',
    description:
      'Applications rapides, accessibles et optimisées pour offrir la meilleure expérience possible.',
    icon: Zap,
  },
  {
    title: 'Sens du détail',
    description:
      'Un design premium se joue dans les détails : micro-interactions, cohérence et finitions soignées.',
    icon: Palette,
  },
  {
    title: 'Apprentissage continu',
    description:
      'Veille technologique constante pour proposer des solutions à la pointe de l’écosystème JavaScript.',
    icon: GraduationCap,
  },
] as const
