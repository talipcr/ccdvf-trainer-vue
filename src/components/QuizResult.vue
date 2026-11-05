<script lang="ts">
import type { Prepared } from '../lib/exam'
export interface ResultRow { it: Prepared; sel: Set<number>; ok: boolean }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { pct } from '../lib/exam'
import { state, t, tq, dom, dName, go, type QuizConfig } from '../store'

const props = defineProps<{ cfg: QuizConfig; rows: ResultRow[]; ok: number; n: number; scaled: number }>()
const isExam = props.cfg.mode === 'exam'
const p0 = pct(props.ok, props.n)
const pass = props.scaled >= 720

const byDomain = computed(() => {
  const m: Record<number, { ok: number; n: number }> = {}
  for (const r of props.rows) {
    const d = (m[r.it.q.d] ??= { ok: 0, n: 0 })
    d.n++
    if (r.ok) d.ok++
  }
  return Object.entries(m)
    .map(([d, v]) => ({ d: Number(d), ...v, p: pct(v.ok, v.n) }))
    .sort((a, b) => dom(b.d).w - dom(a.d).w)
})
const pill = (p: number) => (p >= 80 ? 'ok' : p >= 70 ? 'warn' : 'bad')
const optClass = (r: ResultRow, j: number) => ['opt', r.it.correct.has(j) ? 'right' : r.sel.has(j) ? 'wrong' : '']
</script>

<template>
  <div class="quiz">
    <div class="eyebrow">{{ cfg.title() }}{{ t.result }}</div>
    <div class="row" style="gap:20px;align-items:flex-end">
      <div class="score">{{ isExam ? scaled : p0 + ' %' }}</div>
      <div class="stack" style="gap:4px">
        <span v-if="isExam" :class="['pill', pass ? 'ok' : 'bad']">{{ pass ? t.above : t.below }}</span>
        <span v-else :class="['pill', p0 >= 80 ? 'ok' : 'warn']">{{ p0 >= 80 ? t.goalOk : t.goal }}</span>
        <span class="muted">{{ t.okOf(ok, n) }}</span>
      </div>
    </div>
    <p v-if="isExam" class="muted" style="font-size:13px">{{ t.scaleNote }}</p>

    <div class="panel scroll" style="padding:6px 10px">
      <table>
        <tr><th>{{ t.hDomain }}</th><th>{{ t.hResult }}</th><th></th></tr>
        <tr v-for="r in byDomain" :key="r.d">
          <td><span class="dcode">D{{ r.d }}</span> {{ dName(r.d) }}</td>
          <td class="num">{{ r.ok }} / {{ r.n }} <span :class="['pill', pill(r.p)]">{{ r.p }} %</span></td>
          <td><button v-if="r.p < 80" class="btn ghost" @click="go('course', { d: r.d, i: 0 })">{{ t.revisit }}</button></td>
        </tr>
      </table>
    </div>

    <div class="row">
      <button class="btn" @click="go('dash')">{{ t.dash }}</button>
      <button v-if="state.missed.length" class="btn ghost" @click="go('errors')">{{ t.reviewErr(state.missed.length) }}</button>
    </div>

    <h2>{{ t.correction }}</h2>
    <div v-for="(r, k) in rows" :key="r.it.q.id" class="review-item">
      <div class="row" style="gap:8px">
        <span :class="['pill', r.ok ? 'ok' : 'bad']">{{ k + 1 }} · {{ r.ok ? t.stOk : r.sel.size ? t.stBad : t.stNone }}</span>
        <span class="dcode">D{{ r.it.q.d }}</span>
      </div>
      <p style="font-weight:500">{{ tq(r.it.q).q }}</p>
      <div class="opts">
        <div v-for="(oi, j) in r.it.order" :key="j" :class="optClass(r, j)">
          <span class="lt">{{ 'ABCDEF'[j] }}</span><span>{{ tq(r.it.q).o[oi] }}</span>
        </div>
      </div>
      <p class="muted" style="font-size:14px">{{ tq(r.it.q).e }}</p>
    </div>
  </div>
</template>
