import { describe, expect, it } from 'vitest'
import { DOMAINS, PLAN, QUESTIONS, TRAPS } from './content.fr'
import { EN } from './content.en'
import { UI } from './ui'
import { BLUEPRINT, SHEET_TXT } from './sheet'

describe('contenu', () => {
  it('poids des domaines = 100 %', () => {
    expect(Math.round(DOMAINS.reduce((s, d) => s + d.w, 0) * 10) / 10).toBe(100)
  })

  it('blueprint détaillé = poids de chaque domaine', () => {
    for (const d of DOMAINS) {
      const sum = BLUEPRINT.filter(b => b[0] === d.id).reduce((s, b) => s + b[3], 0)
      expect(Math.round(sum * 10) / 10, `D${d.id}`).toBe(d.w)
    }
  })

  it('questions valides', () => {
    expect(new Set(QUESTIONS.map(q => q.id)).size).toBe(QUESTIONS.length)
    for (const q of QUESTIONS) {
      expect(DOMAINS.some(d => d.id === q.d), q.id).toBe(true)
      expect(q.a.length, q.id).toBeGreaterThan(0)
      expect(q.a.every(i => i < q.o.length), q.id).toBe(true)
      const m = q.q.match(/Choisissez (\d)/)
      if (q.a.length > 1) expect(Number(m?.[1]), q.id).toBe(q.a.length)
      else expect(m, q.id).toBeNull()
    }
  })
})

describe('parité FR / EN', () => {
  it('chaque question existe en anglais avec le même nombre d\'options', () => {
    expect(Object.keys(EN.q).sort()).toEqual(QUESTIONS.map(q => q.id).sort())
    for (const q of QUESTIONS) {
      const e = EN.q[q.id]
      expect(e.o.length, q.id).toBe(q.o.length)
      if (q.a.length > 1) expect(e.q, q.id).toContain(`Choose ${q.a.length}`)
    }
  })

  it('mêmes leçons dans les deux langues', () => {
    for (const d of DOMAINS) {
      expect(EN.d[d.id].lessons.length, `D${d.id}`).toBe(d.lessons.length)
      for (const l of [...d.lessons, ...EN.d[d.id].lessons]) expect(l.h.length, l.t).toBeGreaterThan(200)
    }
  })

  it('mêmes clés d\'interface, pièges, plan et fiche', () => {
    expect(Object.keys(UI.en).sort()).toEqual(Object.keys(UI.fr).sort())
    expect(UI.fr.tabs).toHaveLength(6)
    expect(UI.en.tabs).toHaveLength(6)
    expect(EN.traps).toHaveLength(TRAPS.length)
    expect(EN.plan).toHaveLength(PLAN.length)
    expect(SHEET_TXT.en.keys).toHaveLength(SHEET_TXT.fr.keys.length)
    expect(SHEET_TXT.en.rows).toHaveLength(SHEET_TXT.fr.rows.length)
  })
})
