import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Code2,
  FolderKanban,
  Layers,
  Monitor,
  Palette,
  Server,
  ServerCog,
  ShoppingBag,
  TerminalSquare,
  type LucideIcon,
} from 'lucide-react'
import {
  EDUCATIONS,
  EXPERIENCES,
  type TimelineItem,
} from '@/constants/journey'
import {
  PROJECTS,
  type Project,
} from '@/constants/projects'
import { SKILL_CATEGORIES, type Skill, type SkillCategory } from '@/constants/skills'
import {
  fetchPublicEducations,
  fetchPublicExperiences,
  fetchPublicProjects,
  fetchPublicSkills,
} from '@/services/public'
import type {
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SkillItem,
} from '@/services/admin'

const PROJECT_CATEGORY_PRESETS: Record<string, { icon: LucideIcon; gradient: string }> = {
  fullstack: { icon: Layers, gradient: 'from-primary/40 via-secondary/20 to-transparent' },
  frontend: { icon: Monitor, gradient: 'from-primary/30 via-accent/20 to-transparent' },
  backend: { icon: ServerCog, gradient: 'from-secondary/30 via-primary/20 to-transparent' },
  ecommerce: { icon: ShoppingBag, gradient: 'from-secondary/40 via-primary/20 to-transparent' },
}

const DEFAULT_PROJECT_PRESET: { icon: LucideIcon; gradient: string } = {
  icon: FolderKanban,
  gradient: 'from-primary/30 via-accent/20 to-transparent',
}

const SKILL_CATEGORY_PRESETS: Record<string, LucideIcon> = {
  Frontend: Code2,
  Backend: Server,
  'DevOps & Outils': TerminalSquare,
  'Design & Qualité': Palette,
}

function adaptProject(item: ProjectItem): Project {
  const preset = PROJECT_CATEGORY_PRESETS[item.category ?? ''] ?? DEFAULT_PROJECT_PRESET
  return {
    slug: item.slug,
    title: item.title,
    category: item.category ?? 'fullstack',
    year: item.year ?? '',
    role: item.role ?? '',
    description: item.description,
    longDescription: item.longDescription ?? '',
    stack: item.stack ?? [],
    features: item.features ?? [],
    outcomes: item.outcomes ?? [],
    icon: preset.icon,
    gradient: preset.gradient,
    featured: item.featured,
    githubUrl: item.githubUrl ?? undefined,
    liveUrl: item.liveUrl ?? undefined,
  }
}

function groupSkills(items: SkillItem[]): SkillCategory[] {
  const groups = new Map<string, SkillItem[]>()
  for (const item of items) {
    const category = item.category?.trim() || 'Frontend'
    const list = groups.get(category) ?? []
    list.push(item)
    groups.set(category, list)
  }

  const presets = Object.keys(SKILL_CATEGORY_PRESETS)
  const custom = [...groups.keys()].filter((category) => !presets.includes(category))
  const ordered = [...presets, ...custom].filter((category) => groups.has(category))

  return ordered.map((category) => ({
    title: category,
    icon: SKILL_CATEGORY_PRESETS[category] ?? Code2,
    skills: (groups.get(category) ?? []).map(
      (item): Skill => ({ name: item.name, level: item.level }),
    ),
  }))
}

function formatPeriod(start?: string | null, end?: string | null, isCurrent?: boolean): string {
  const startYear = start ? start.slice(0, 4) : ''
  const endYear = isCurrent ? 'Aujourd’hui' : end ? end.slice(0, 4) : ''
  if (startYear && endYear) return `${startYear} — ${endYear}`
  return startYear || endYear
}

function adaptExperience(item: ExperienceItem): TimelineItem {
  return {
    period: formatPeriod(item.startDate, item.endDate, item.isCurrent),
    title: item.role,
    subtitle: [item.company, item.location].filter(Boolean).join(' · '),
    description: item.description ?? '',
    current: item.isCurrent,
    tags: item.tags ?? [],
  }
}

function adaptEducation(item: EducationItem): TimelineItem {
  return {
    period: formatPeriod(item.startDate, item.endDate, item.isCurrent),
    title: item.degree,
    subtitle: [item.school, item.field].filter(Boolean).join(' · '),
    description: item.description ?? '',
    current: item.isCurrent,
    tags: item.tags ?? [],
  }
}

export function useProjects(): Project[] {
  const { data } = useQuery({
    queryKey: ['public', 'projects'],
    queryFn: fetchPublicProjects,
    staleTime: 60_000,
  })
  return useMemo(() => {
    if (data && data.length > 0) return data.map(adaptProject)
    return PROJECTS
  }, [data])
}

export function useFeaturedProjects(): Project[] {
  const projects = useProjects()
  return useMemo(() => {
    const featured = projects.filter((project) => project.featured)
    return featured.length > 0 ? featured : projects.slice(0, 3)
  }, [projects])
}

export function useProjectBySlug(slug: string | undefined): Project | undefined {
  const projects = useProjects()
  return useMemo(() => projects.find((project) => project.slug === slug), [projects, slug])
}

export function useSkills(): SkillCategory[] {
  const { data } = useQuery({
    queryKey: ['public', 'skills'],
    queryFn: fetchPublicSkills,
    staleTime: 60_000,
  })
  return useMemo(() => {
    if (data && data.length > 0) return groupSkills(data)
    return SKILL_CATEGORIES
  }, [data])
}

export function useExperiences(): TimelineItem[] {
  const { data } = useQuery({
    queryKey: ['public', 'experiences'],
    queryFn: fetchPublicExperiences,
    staleTime: 60_000,
  })
  return useMemo(() => {
    if (data && data.length > 0) return data.map(adaptExperience)
    return EXPERIENCES
  }, [data])
}

export function useEducations(): TimelineItem[] {
  const { data } = useQuery({
    queryKey: ['public', 'educations'],
    queryFn: fetchPublicEducations,
    staleTime: 60_000,
  })
  return useMemo(() => {
    if (data && data.length > 0) return data.map(adaptEducation)
    return EDUCATIONS
  }, [data])
}
