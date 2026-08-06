import { Check } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import type { Service } from '@/constants/services'

interface ServiceCardProps {
  service: Service
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card hover className="group flex h-full flex-col p-7">
      <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 text-primary transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110">
        <service.icon className="size-6" strokeWidth={1.75} />
      </span>
      <h3 className="mt-5 font-sora text-lg font-semibold text-foreground">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
      <ul className="mt-5 space-y-2.5 border-t border-white/5 pt-5">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5 text-sm text-muted">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <Check className="size-3" strokeWidth={3} />
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </Card>
  )
}
