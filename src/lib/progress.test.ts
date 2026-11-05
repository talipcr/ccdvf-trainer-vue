import { describe, expect, it } from 'vitest'
import { defaultProgress, parseProgress } from './progress'

describe('parseProgress', () => {
  it('rien ou JSON invalide → valeurs par défaut', () => {
    expect(parseProgress(null)).toEqual(defaultProgress())
    expect(parseProgress('pas du json')).toEqual(defaultProgress())
    expect(parseProgress('"abc"')).toEqual(defaultProgress())
  })

  it('garde une sauvegarde valide de la version HTML', () => {
    const saved = { read: { '2-0': true }, quiz: { 2: 80 }, missed: ['d2-01'], exams: [{ date: 1, n: 53, ok: 40, scaled: 779 }], lang: 'en', examDate: '2026-11-14', done: { 0: true } }
    expect(parseProgress(JSON.stringify(saved))).toEqual({ ...saved, theme: null })
  })

  it('garde le thème choisi', () => {
    expect(parseProgress('{"theme":"dark"}').theme).toBe('dark')
    expect(parseProgress('{"theme":"light"}').theme).toBe('light')
  })

  it('remplace chaque champ invalide par sa valeur par défaut', () => {
    const p = parseProgress(JSON.stringify({ lang: 'de', theme: 'blue', missed: null, exams: {}, read: [], quiz: 'x', done: null, examDate: 5 }))
    expect(p).toEqual(defaultProgress())
  })
})
