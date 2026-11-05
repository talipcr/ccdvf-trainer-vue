<script setup lang="ts">
import { ref } from 'vue'
import { DOMAINS, QUESTIONS } from '../data/content.fr'
import { prep, sampleExam } from '../lib/exam'
import { state, t, dName, startQuiz } from '../store'

const count = ref(53)
const mode = ref<'exam' | 'practice'>('exam')
const domain = ref<number | null>(null)

function start() {
  const did = domain.value
  const qs = sampleExam(QUESTIONS, DOMAINS, count.value, did)
  const m = mode.value
  startQuiz({
    title: () => (did ? t.value.examD(did) : t.value.examTitle(qs.length)),
    items: qs.map(prep),
    mode: m,
    minutes: m === 'exam' ? Math.round((120 * qs.length) / 53) : null,
    onDone: (ok, n, scaled) => { if (m === 'exam' && !did) state.exams.push({ date: Date.now(), n, ok, scaled }) },
  })
}
</script>

<template>
  <div class="stack">
    <div class="eyebrow">{{ t.bank(QUESTIONS.length) }}</div>
    <h1>{{ t.examH }}</h1>
    <p class="muted" style="max-width:68ch">{{ t.examIntro }}</p>

    <form class="panel stack" style="max-width:640px" @submit.prevent="start">
      <fieldset>
        <legend>{{ t.numQ }}</legend>
        <select id="ex-n" v-model.number="count">
          <option :value="20">{{ t.opt20 }}</option>
          <option :value="40">{{ t.opt40 }}</option>
          <option :value="53">{{ t.opt53 }}</option>
          <option :value="QUESTIONS.length">{{ t.optAll(QUESTIONS.length) }}</option>
        </select>
      </fieldset>
      <fieldset>
        <legend>{{ t.mode }}</legend>
        <label class="choice"><input id="m-exam" v-model="mode" type="radio" value="exam">{{ t.modeExam }}</label>
        <label class="choice"><input id="m-prac" v-model="mode" type="radio" value="practice">{{ t.modePrac }}</label>
      </fieldset>
      <fieldset>
        <legend>{{ t.domains }}</legend>
        <select id="ex-d" v-model="domain">
          <option :value="null">{{ t.allD }}</option>
          <option v-for="d in DOMAINS" :key="d.id" :value="d.id">{{ t.onlyD(d.id, dName(d.id)) }}</option>
        </select>
      </fieldset>
      <div class="row"><button class="btn" type="submit">{{ t.start }}</button></div>
    </form>

    <div class="panel stack" style="max-width:640px;gap:8px">
      <h3>{{ t.otherMocks }}</h3>
      <p><a href="https://webapp-five-woad-56.vercel.app/developer" target="_blank" rel="noopener">Mock exam Developer – Foundations</a>{{ t.mock1 }}</p>
      <p><a href="https://rachidchabane.github.io/cca-f-exam-trainer/" target="_blank" rel="noopener">CCA-F Exam Trainer</a>{{ t.mock2 }}</p>
    </div>
  </div>
</template>
