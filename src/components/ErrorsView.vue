<script setup lang="ts">
import { computed } from 'vue'
import { QUESTIONS } from '../data/content.fr'
import type { Question } from '../data/types'
import { prep, shuffle } from '../lib/exam'
import { state, t, tq, dom, startQuiz } from '../store'

const qs = computed(() => state.missed.map(id => QUESTIONS.find(q => q.id === id)).filter((q): q is Question => !!q))
const byDomain = computed(() => {
  const m: Record<number, number> = {}
  for (const q of qs.value) m[q.d] = (m[q.d] ?? 0) + 1
  return Object.entries(m).map(([d, n]) => ({ d: Number(d), n })).sort((a, b) => dom(b.d).w - dom(a.d).w)
})

function review() {
  startQuiz({ title: () => t.value.errRun, items: shuffle(qs.value).map(prep), mode: 'practice' })
}
</script>

<template>
  <div class="stack">
    <div class="eyebrow">{{ t.errEyebrow }}</div>
    <h1>{{ t.errTitle }}</h1>
    <div v-if="qs.length" class="stack">
      <div class="row"><span v-for="x in byDomain" :key="x.d" class="pill bad">D{{ x.d }} · {{ x.n }}</span></div>
      <div class="row"><button class="btn" @click="review">{{ t.errReview(qs.length) }}</button></div>
      <div class="panel scroll" style="padding:6px 10px">
        <table>
          <tr><th>{{ t.hDomain }}</th><th>{{ t.errQ }}</th></tr>
          <tr v-for="q in qs" :key="q.id"><td><span class="dcode">D{{ q.d }}</span></td><td>{{ tq(q).q }}</td></tr>
        </table>
      </div>
    </div>
    <div v-else class="panel">{{ t.errNone }}</div>
  </div>
</template>
