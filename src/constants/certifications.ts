export interface Certification {
  title: string
  issuer: string
  issuedAt: string
  description: string
  credentialId?: string
  url?: string
  tags: string[]
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Développeur Full Stack JavaScript',
    issuer: "MO'OCK Academy",
    issuedAt: '2025',
    description:
      'Certification de la formation intensive couvrant toute la chaîne de développement : frontend (React, TypeScript, Tailwind), backend (Node.js, Express, API REST, JWT) et bases de données (MongoDB, MySQL).',
    url: 'https://www.linkedin.com/company/mo-ock',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
  },
] as const
