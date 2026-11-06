# CCDV-F Trainer

Lessons and mock exams for the **Claude Certified Developer – Foundations (CCDV-F)** certification, in French and English.

- 25 lessons covering the 8 domains of the official exam guide v1.0
- 134 questions (single and multiple choice), with explanations
- Domain quizzes, a timed 53-question mock exam (120 min), mistake review
- Cheat sheet, exam traps, day-by-day study plan

Unofficial tool, not affiliated with Anthropic. Content checked on November 4, 2026 against the exam guide v1.0 and Anthropic's documentation: check the official guide before taking the exam.

## Stack

Vue 3 (Composition API, `<script setup>`), TypeScript, Vite, Vitest. No other runtime dependency.

Progress (lessons read, scores, mistakes, language, theme) is saved in the browser's `localStorage`: it stays on the device and is never sent anywhere.

```
src/
  data/        typed content: FR lessons and questions (content.fr.ts), translations (content.en.ts),
               UI strings (ui.ts), cheat sheet and blueprint (sheet.ts)
  lib/exam.ts  pure logic: shuffle, weighted sampling, score, countdown
  store.ts     reactive state, language, navigation
  components/  one view per tab + QuizRunner / QuizResult
```

## Development

```bash
npm install
npm run dev        # local server
npm test           # Vitest tests (logic + FR/EN content consistency)
npm run build      # type check, then build into dist/
```

`.npmrc` enables `legacy-peer-deps` to work around an npm 10 bug with Vitest 4's optional dependencies.

## Adding a question

1. Add the entry to `QUESTIONS` (`src/data/content.fr.ts`): `a` holds the indices of the correct answers; for several correct answers, write "(Choisissez N)" in the question.
2. Add the translation under the same `id` in `EN.q` (`src/data/content.en.ts`), options in the same order, with "(Choose N)".
3. `npm test` checks consistency.

## Hosting on GitHub Pages

1. Push the repository to GitHub (`main` branch).
2. In the repository: **Settings → Pages → Source: GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml` (tests, build, publish).
4. The site is published at `https://<user>.github.io/<repository>/`.
