export type Lang = 'fr' | 'en'

export interface Lesson { t: string; h: string }

export interface Domain { id: number; name: string; w: number; lessons: Lesson[] }

/** a = indices des bonnes réponses dans o ; plusieurs = question à réponses multiples */
export interface Question { id: string; d: number; q: string; o: string[]; a: number[]; e: string }

export interface QuestionText { q: string; o: string[]; e: string }

export interface PlanDay { w: string; t: string; items: string[] }

export type Trap = [string, string]

export interface EnContent {
  d: Record<string, { name: string; lessons: Lesson[] }>
  q: Record<string, QuestionText>
  traps: Trap[]
  plan: PlanDay[]
}

/** [domaine, compétence FR, compétence EN, poids %] */
export type BlueprintSkill = [number, string, string, number]

export type Source = [string, string]

export interface SheetText {
  title: string; eyebrow: string; fmt: string; bp: string; bpH: string[]
  rows: [string, string][]
  keysT: string; keys: string[]
  timeT: string; time: string[]
  srcT: string
}

export interface ExamRecord { date: number; n: number; ok: number; scaled: number }
