# CCDV-F Trainer

Cours et examens blancs pour la certification **Claude Certified Developer – Foundations (CCDV-F)**, en français et en anglais.

- 25 leçons sur les 8 domaines du guide d'examen officiel v1.0
- 134 questions (choix unique et multiple), avec explications
- Quiz par domaine, examen blanc chronométré de 53 questions (120 min), révision des erreurs
- Fiche de révision, pièges de l'examen, plan de révision jour par jour

Outil non officiel, sans lien avec Anthropic. Contenu vérifié le 4 novembre 2026 contre le guide d'examen v1.0 et la documentation Anthropic : vérifie le guide officiel avant de passer l'examen.

## Stack

Vue 3 (Composition API, `<script setup>`), TypeScript, Vite, Vitest. Aucune autre dépendance d'exécution.

La progression (leçons lues, scores, erreurs, langue) est enregistrée dans le `localStorage` du navigateur : elle reste sur l'appareil et n'est envoyée nulle part.

```
src/
  data/        contenu typé : leçons et questions FR (content.fr.ts), traductions (content.en.ts),
               textes d'interface (ui.ts), fiche et blueprint (sheet.ts)
  lib/exam.ts  logique pure : mélange, tirage pondéré, score, compte à rebours
  store.ts     état réactif, langue, navigation
  components/  une vue par onglet + QuizRunner / QuizResult
```

## Développement

```bash
npm install
npm run dev        # serveur local
npm test           # tests Vitest (logique + cohérence FR/EN du contenu)
npm run build      # vérification de types puis build dans dist/
```

`.npmrc` active `legacy-peer-deps` pour contourner un bug de npm 10 sur les dépendances optionnelles de Vitest 4.

## Ajouter une question

1. Ajouter l'entrée dans `QUESTIONS` (`src/data/content.fr.ts`) : `a` contient les indices des bonnes réponses ; pour plusieurs bonnes réponses, écrire « (Choisissez N) » dans la question.
2. Ajouter la traduction sous le même `id` dans `EN.q` (`src/data/content.en.ts`), options dans le même ordre, avec « (Choose N) ».
3. `npm test` vérifie la cohérence.

## Héberger sur GitHub Pages

1. Pousser le dépôt sur GitHub (branche `main`).
2. Dans le dépôt : **Settings → Pages → Source : GitHub Actions**.
3. Chaque push sur `main` lance `.github/workflows/deploy.yml` (tests, build, publication).
4. Le site est publié à `https://<utilisateur>.github.io/<dépôt>/`.
