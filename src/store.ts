import { computed, reactive, watch } from 'vue'
import type { Domain, Question } from './data/types'
import { DOMAINS, QUESTIONS } from './data/content.fr'
import { EN } from './data/content.en'
import { UI } from './data/ui'
import { pct, prep, shuffle, type Prepared } from './lib/exam'
import { parseProgress, type Progress } from './lib/progress'

/* ---------- progression (localStorage, même clé que la version HTML) ---------- */
const KEY = 'ccdvf-trainer-v1'

function load(): Progress {
  try { return parseProgress(localStorage.getItem(KEY)) } catch { return parseProgress(null) } // stockage bloqué
}

export const state = reactive<Progress>(load())

watch(state, v => {
  try { localStorage.setItem(KEY, JSON.stringify(v)) } catch { /* idem */ }
}, { deep: true })

watch(() => state.lang, l => { document.documentElement.lang = l }, { immediate: true })

/* ---------- thème : choix explicite, sinon celui du système ---------- */
const darkMq = window.matchMedia('(prefers-color-scheme: dark)')
export const theme = computed(() => state.theme ?? (darkMq.matches ? 'dark' : 'light'))
watch(() => state.theme, th => {
  if (th) document.documentElement.dataset.theme = th
  else delete document.documentElement.dataset.theme
}, { immediate: true })

/* ---------- langue ---------- */
export const t = computed(() => UI[state.lang])
export const dom = (id: number): Domain => DOMAINS.find(d => d.id === id)!
export const dName = (id: number): string => (state.lang === 'en' ? EN.d[id].name : dom(id).name)
export const lessonsOf = (d: Domain) => (state.lang === 'en' ? EN.d[d.id].lessons : d.lessons)
export const tq = (q: Question): Question => (state.lang === 'en' && EN.q[q.id] ? { ...q, ...EN.q[q.id] } : q)

export const lessonId = (d: number, i: number) => `${d}-${i}`

export function track(id: string, ok: boolean) {
  state.missed = state.missed.filter(x => x !== id)
  if (!ok) state.missed.push(id)
}

/* ---------- navigation ---------- */
export type View = 'dash' | 'course' | 'exam' | 'errors' | 'traps' | 'sheet'
export const VIEWS: View[] = ['dash', 'course', 'exam', 'errors', 'traps', 'sheet']

export interface QuizConfig {
  title: () => string
  items: Prepared[]
  mode: 'exam' | 'practice'
  minutes?: number | null
  onDone?: (ok: number, n: number, scaled: number) => void
}

export const nav = reactive<{ view: View; course: { d: number; i: number }; quiz: QuizConfig | null; key: number }>({
  view: 'dash', course: { d: DOMAINS[0].id, i: 0 }, quiz: null, key: 0,
})

export function go(view: View, course?: { d: number; i: number }) {
  nav.view = view
  if (course) nav.course = course
  nav.quiz = null
  window.scrollTo(0, 0)
}

export function startQuiz(cfg: QuizConfig) {
  nav.quiz = cfg
  nav.key++
  if (cfg.mode === 'exam') nav.view = 'exam'
  window.scrollTo(0, 0)
}

export function startDomainQuiz(did: number) {
  startQuiz({
    title: () => t.value.quizTitle(did, dName(did)),
    items: shuffle(QUESTIONS.filter(q => q.d === did)).map(prep),
    mode: 'practice',
    onDone: (ok, n) => { state.quiz[did] = Math.max(state.quiz[did] ?? 0, pct(ok, n)) },
  })
}
