import { Code2, Server, TerminalSquare, Palette, type LucideIcon } from 'lucide-react'

export interface Skill {
  name: string
  level: number
}

export interface SkillCategory {
  title: string
  icon: LucideIcon
  skills: Skill[]
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Code2,
    skills: [
      { name: 'React / Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'TailwindCSS', level: 95 },
      { name: 'Framer Motion', level: 85 },
      { name: 'Redux / Zustand', level: 85 },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js / Express', level: 90 },
      { name: 'NestJS', level: 75 },
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL / Prisma', level: 85 },
      { name: 'REST / GraphQL', level: 85 },
    ],
  },
  {
    title: 'DevOps & Outils',
    icon: TerminalSquare,
    skills: [
      { name: 'Docker', level: 75 },
      { name: 'Git / GitHub', level: 90 },
      { name: 'CI / CD', level: 75 },
      { name: 'Vercel / Netlify', level: 90 },
      { name: 'Linux', level: 70 },
    ],
  },
  {
    title: 'Design & Qualité',
    icon: Palette,
    skills: [
      { name: 'UI / UX Design', level: 80 },
      { name: 'Design Systems', level: 75 },
      { name: 'Tests (Vitest / Jest)', level: 75 },
      { name: 'SEO & Performance', level: 80 },
    ],
  },
] as const
