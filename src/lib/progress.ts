import type { ExamRecord, Lang } from '../data/types'

export interface Progress {
  read: Record<string, boolean>
  quiz: Record<number, number>
  missed: string[]
  exams: ExamRecord[]
  lang: Lang
  examDate: string
  done: Record<number, boolean>
}

export const defaultProgress = (): Progress => ({ read: {}, quiz: {}, missed: [], exams: [], lang: 'fr', examDate: '2026-11-16', done: {} })

const obj = (v: unknown) => (v && typeof v === 'object' && !Array.isArray(v) ? v : null)

/** Relit la sauvegarde ; tout champ absent ou invalide reprend sa valeur par défaut */
export function parseProgress(raw: string | null): Progress {
  const d = defaultProgress()
  let p: Record<string, unknown> | null = null
  try { p = raw ? (obj(JSON.parse(raw)) as Record<string, unknown> | null) : null } catch { /* JSON invalide */ }
  if (!p) return d
  return {
    read: (obj(p.read) as Progress['read']) ?? d.read,
    quiz: (obj(p.quiz) as Progress['quiz']) ?? d.quiz,
    done: (obj(p.done) as Progress['done']) ?? d.done,
    missed: Array.isArray(p.missed) ? p.missed.filter((x): x is string => typeof x === 'string') : d.missed,
    exams: Array.isArray(p.exams) ? (p.exams as ExamRecord[]) : d.exams,
    lang: p.lang === 'en' ? 'en' : 'fr',
    examDate: typeof p.examDate === 'string' ? p.examDate : d.examDate,
  }
}
