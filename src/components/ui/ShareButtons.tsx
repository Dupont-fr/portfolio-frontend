import { Share2 } from 'lucide-react'
import { FaFacebookF, FaXTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa6'

interface ShareButtonsProps {
  url: string
  title: string
}

const networks = [
  {
    label: 'Facebook',
    icon: FaFacebookF,
    color: '#1877F2',
    buildUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    label: 'X',
    icon: FaXTwitter,
    color: '#000000',
    buildUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    label: 'LinkedIn',
    icon: FaLinkedin,
    color: '#0A66C2',
    buildUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    label: 'WhatsApp',
    icon: FaWhatsapp,
    color: '#25D366',
    buildUrl: (url: string, title: string) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
]

export function ShareButtons({ url, title }: ShareButtonsProps) {
  return (
    <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center gap-2 text-sm font-medium text-muted">
        <Share2 className="size-4 text-primary" />
        Partager cet article
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        {networks.map((network) => (
          <a
            key={network.label}
            href={network.buildUrl(url, title)}
            target="_blank"
            rel="noreferrer noopener"
            title={`Partager sur ${network.label}`}
            className="grid size-11 place-items-center rounded-xl text-white shadow-lg shadow-black/20 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{ backgroundColor: network.color }}
          >
            <network.icon className="size-5" />
          </a>
        ))}
      </div>
    </div>
  )
}
