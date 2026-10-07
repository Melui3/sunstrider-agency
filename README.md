# Sunstrider Agency

Archives immersives de la dynastie Sunstrider : biographies illustrées, succession interactive, chronologie, atlas schématique, recherche et sources. Projet de fans indépendant de Blizzard.

Le récit principal couvre les origines à The Burning Crusade. Shadowlands est présenté dans un épilogue replié ; Midnight est un prolongement externe identifié. Le salon RP est explicitement non canonique. Le contenu constitue une sélection documentée, pas une encyclopédie exhaustive.

Les données et références sont regroupées dans `src/lore.js`. Les nouvelles illustrations ont été créées avec l’outil intégré ImageGen ; leurs prompts exacts sont conservés dans `assets/image-prompts.json`. Les images utilisées sont des WebP locaux. Les PNG d’origine sont conservés et ne sont plus chargés par le site.

Les URL utilisent le préfixe `/sunstrider-agency/`. Le déploiement GitHub Pages fournit un `404.html` de repli pour les accès directs aux dossiers.

## Site publié

https://melui3.github.io/sunstrider-agency/

## Lancer le projet

```bash
npm install
npm run dev
```

Le site tourne ensuite sur `http://127.0.0.1:5173/`.

## Build

```bash
npm run build
```

## Stack

- Vite
- React
- Tailwind CSS
- lucide-react
