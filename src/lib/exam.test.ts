import { describe, expect, it } from 'vitest'
import { daysTo, isRight, pct, prep, sampleExam, scaledScore, shuffle } from './exam'
import { DOMAINS, QUESTIONS } from '../data/content.fr'

describe('shuffle', () => {
  it('garde les mêmes éléments sans modifier l\'original', () => {
    const a = [1, 2, 3, 4, 5]
    const s = shuffle(a)
    expect([...s].sort()).toEqual(a)
    expect(a).toEqual([1, 2, 3, 4, 5])
  })
})

describe('prep + isRight', () => {
  const multi = QUESTIONS.find(q => q.a.length > 1)!
  const single = QUESTIONS.find(q => q.a.length === 1)!

  it('les bonnes réponses suivent le mélange des options', () => {
    for (let k = 0; k < 20; k++) {
      const it = prep(single)
      const [c] = [...it.correct]
      expect(single.a).toContain(it.order[c])
    }
  })

  it('tout-ou-rien sur les questions à réponses multiples', () => {
    const it = prep(multi)
    const right = new Set(it.correct)
    expect(isRight(it, right)).toBe(true)
    expect(isRight(it, new Set([...right].slice(0, 1)))).toBe(false)
    const wrong = it.order.map((_, k) => k).find(k => !it.correct.has(k))!
    expect(isRight(it, new Set([...right, wrong]))).toBe(false)
    expect(isRight(it, new Set())).toBe(false)
  })
})

describe('sampleExam', () => {
  it.each([20, 40, 53, QUESTIONS.length])('%i questions, sans doublon', n => {
    const s = sampleExam(QUESTIONS, DOMAINS, n)
    expect(s).toHaveLength(n)
    expect(new Set(s.map(q => q.id)).size).toBe(n)
  })

  it('53 questions réparties selon les poids officiels', () => {
    const count: Record<number, number> = {}
    for (const q of sampleExam(QUESTIONS, DOMAINS, 53)) count[q.d] = (count[q.d] ?? 0) + 1
    expect(count).toEqual({ 1: 8, 2: 17, 3: 2, 4: 1, 5: 9, 6: 6, 7: 4, 8: 6 })
  })

  it('filtre par domaine', () => {
    const s = sampleExam(QUESTIONS, DOMAINS, 53, 3)
    expect(s.length).toBe(QUESTIONS.filter(q => q.d === 3).length)
    expect(s.every(q => q.d === 3)).toBe(true)
  })
})

describe('scores et dates', () => {
  it('score estimé linéaire 100–1000', () => {
    expect(scaledScore(0, 53)).toBe(100)
    expect(scaledScore(53, 53)).toBe(1000)
    expect(scaledScore(37, 53)).toBe(728)
  })

  it('pct gère zéro', () => {
    expect(pct(1, 4)).toBe(25)
    expect(pct(0, 0)).toBe(0)
  })

  it('daysTo compte les jours calendaires', () => {
    const today = new Date(2026, 10, 4, 15, 30)
    expect(daysTo('2026-11-16', today)).toBe(12)
    expect(daysTo('2026-11-04', today)).toBe(0)
    expect(daysTo('2026-11-03', today)).toBe(-1)
    expect(daysTo('nimporte', today)).toBe(0)
  })
})
