import type { Domain, Question } from '../data/types'

export function shuffle<T>(a: readonly T[], rnd: () => number = Math.random): T[] {
  const r = a.slice()
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[r[i], r[j]] = [r[j], r[i]]
  }
  return r
}

/** Question prête à afficher : options mélangées, indices corrects dans l'ordre affiché */
export interface Prepared { q: Question; order: number[]; correct: Set<number> }

export function prep(q: Question): Prepared {
  const order = shuffle(q.o.map((_, i) => i))
  const correct = new Set<number>()
  order.forEach((o, k) => { if (q.a.includes(o)) correct.add(k) })
  return { q, order, correct }
}

/** Tout-ou-rien : exactement les bonnes réponses, rien d'autre */
export function isRight(item: Prepared, sel: ReadonlySet<number>): boolean {
  if (sel.size !== item.correct.size) return false
  for (const k of sel) if (!item.correct.has(k)) return false
  return true
}

/** Tire n questions, réparties selon les poids des domaines (plus forts restes), ou d'un seul domaine */
export function sampleExam(questions: Question[], domains: Domain[], n: number, domainId?: number | null): Question[] {
  if (domainId) return shuffle(questions.filter(q => q.d === domainId)).slice(0, n)
  const alloc = domains.map(d => {
    const pool = questions.filter(q => q.d === d.id)
    const exact = (n * d.w) / 100
    return { pool, k: Math.min(pool.length, Math.floor(exact)), frac: exact - Math.floor(exact) }
  })
  let left = n - alloc.reduce((s, a) => s + a.k, 0)
  for (const a of [...alloc].sort((x, y) => y.frac - x.frac)) {
    if (left <= 0) break
    if (a.k < a.pool.length) { a.k++; left-- }
  }
  for (const a of alloc) while (left > 0 && a.k < a.pool.length) { a.k++; left-- }
  return shuffle(alloc.flatMap(a => shuffle(a.pool).slice(0, a.k)))
}

// ponytail: conversion linéaire, le vrai barème Anthropic n'est pas publié
export const scaledScore = (ok: number, n: number): number => Math.round(100 + (900 * ok) / n)

export const pct = (n: number, d: number): number => (d ? Math.round((100 * n) / d) : 0)

/** Jours calendaires entre aujourd'hui et une date AAAA-MM-JJ ; 0 si invalide */
export function daysTo(v: string, today: Date = new Date()): number {
  const p = String(v || '').split('-').map(Number)
  if (p.length !== 3 || p.some(Number.isNaN)) return 0
  const t0 = new Date(today)
  t0.setHours(0, 0, 0, 0)
  return Math.round((new Date(p[0], p[1] - 1, p[2]).getTime() - t0.getTime()) / 86400000)
}

/** Date du jour k d'un sprint de n jours qui se termine le jour de l'examen (AAAA-MM-JJ) ; null si invalide */
export function sprintDay(examDate: string, k: number, n: number): Date | null {
  const p = String(examDate || '').split('-').map(Number)
  if (p.length !== 3 || p.some(Number.isNaN)) return null
  return new Date(p[0], p[1] - 1, p[2] - (n - 1 - k))
}
