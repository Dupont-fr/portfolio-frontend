# Portfolio — Frontend

Interface premium (inspirée Apple / Stripe / Linear / Vercel) d'un portfolio de développeur Full Stack JavaScript : accueil, à propos, compétences, projets, services, parcours, certifications, blog, contact, espace admin (dashboard + gestion de contenu).

Stack : **React 19, TypeScript, Vite 8, TailwindCSS 4, React Router 7, Framer Motion, TanStack Query, React Hook Form, Zod, Axios, Zustand, Lucide**.

## Prérequis

- Node.js ≥ 20

## Installation

```bash
npm install
cp .env.example .env.local   # puis renseigner les valeurs
npm run dev
```

## Scripts

| Commande | Description |
| --- | --- |
| `npm run dev` | Serveur de développement (Vite, port 5173) |
| `npm run build` | Vérifie les types puis construit l'application |
| `npm run preview` | Prévisualise le build de production |
| `npm test` | Lance les tests unitaires (Vitest + Testing Library) |
| `npm run typecheck` | Vérifie les types sans construire |
| `npm run format` | Formate le code (Prettier) |

## Variables d'environnement

| Variable | Description | Défaut |
| --- | --- | --- |
| `VITE_API_URL` | URL de base de l'API (avec `/api`) | `http://localhost:5000/api` |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloud Cloudinary (uploads admin) | `ddnolovmg` |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Upload preset Cloudinary | `rony_hair_uploads` |

> En production, `VITE_API_URL` doit pointer vers l'URL du backend déployé (ex. `https://portfolio-backend.onrender.com/api`). Les variables `VITE_*` sont embarquées au moment du build.

## Pages

- Publiques : `/`, `/about`, `/skills`, `/projects`, `/projects/:slug`, `/services`, `/journey`, `/certifications`, `/blog`, `/blog/:slug`, `/contact`
- Admin (protégé) : `/admin/login`, `/admin` (dashboard), `/admin/projects`, `/admin/skills`, `/admin/educations`, `/admin/experiences`, `/admin/certifications`, `/admin/blog`, `/admin/messages`, `/admin/settings`
- Autres : `*` (page 404)

## Structure

```
src/
├── components/        # Composants UI, cartes (projets, blog, certifications…)
├── layouts/           # Layouts principal et admin
├── pages/             # Pages publiques + pages d'admin
├── hooks/             # Hooks React (contenu public, données admin…)
├── services/          # Appels API (client axios, auth, contact, visites, cloudinary)
├── context/           # Contextes React
├── store/             # État global (Zustand)
├── routes/            # Router + chemins
├── types/             # Types partagés
├── utils/             # Utilitaires (cn, …)
├── constants/         # Données statiques (certifications de repli, services…)
└── test/              # Setup Vitest (mocks IntersectionObserver / matchMedia)
```

## Tests

```bash
npm test
```

Tests unitaires (Vitest + Testing Library) sur les utilitaires, composants clés et services.

## Déploiement

Le frontend est prêt pour **Vercel** (voir `vercel.json`). Configurer `VITE_API_URL` dans les variables d'environnement du projet Vercel puis relancer un déploiement.
