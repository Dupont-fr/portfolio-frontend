import { Mail, Phone } from 'lucide-react'
import {
  FaGithub,
  FaXTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
} from 'react-icons/fa6'
import type { SocialLink } from '@/types'

export const SITE = {
  name: 'Dupont Djéague',
  brand: 'Dupont Djeague',
  role: 'Développeur Full Stack JavaScript',
  email: 'dupontdjeague@gmail.com',
  phone: '+237 692 763 964',
  whatsappUrl: 'https://wa.me/237692763964',
  location: 'Ouest Cameroun',
  tagline: 'Je conçois et développe des expériences web premium, performantes et accessibles.',
  availability: 'Disponible pour de nouvelles missions',
} as const

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/Dupont-fr', color: '#181717', icon: FaGithub },
  { label: 'X (Twitter)', url: 'https://x.com/dupont_237', color: '#000000', icon: FaXTwitter },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/dupont-djeague-5366572ab/',
    color: '#0A66C2',
    icon: FaLinkedin,
  },
  { label: 'WhatsApp', url: SITE.whatsappUrl, color: '#25D366', icon: FaWhatsapp },
  {
    label: 'Facebook',
    url: 'https://web.facebook.com/dupont.djeague',
    color: '#1877F2',
    icon: FaFacebookF,
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/djeaguedupont/',
    color: '#E4405F',
    icon: FaInstagram,
  },
]

export const CONTACT_INFOS = [
  { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, icon: Mail },
  { label: 'Téléphone / WhatsApp', value: SITE.phone, href: SITE.whatsappUrl, icon: Phone },
] as const
