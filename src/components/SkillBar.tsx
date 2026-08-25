import { motion } from 'framer-motion'
import type { Skill } from '@/constants/skills'

interface SkillBarProps {
  skill: Skill
  index?: number
  isVisible: boolean
}

export function SkillBar({ skill, index = 0, isVisible }: SkillBarProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium text-foreground">{skill.name}</span>
        <span className="font-sora text-xs font-semibold text-primary">{skill.level}%</span>
      </div>
      <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-secondary via-primary to-accent shadow-[0_0_12px_rgba(0,194,255,0.5)]"
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
        />
      </div>
    </div>
  )
}
