<script setup lang="ts">
import { computed } from 'vue'
import { DOMAINS, PLAN } from '../data/content.fr'
import { EN } from '../data/content.en'
import { daysTo, pct } from '../lib/exam'
import { state, t, dName, lessonsOf, lessonId, go, startDomainQuiz } from '../store'

const sorted = [...DOMAINS].sort((a, b) => b.w - a.w)
const totalLessons = DOMAINS.reduce((s, d) => s + d.lessons.length, 0)
const readCount = computed(() => Object.keys(state.read).length)
const last = computed(() => state.exams[state.exams.length - 1])
const avgQuiz = computed(() => {
  const v = Object.values(state.quiz)
  return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) + ' %' : '—'
})
const next = computed(() => {
  for (const d of sorted) for (let i = 0; i < d.lessons.length; i++) if (!state.read[lessonId(d.id, i)]) return { d, i }
  return null
})
const plan = computed(() => (state.lang === 'en' ? EN.plan : PLAN))
const history = computed(() => state.exams.slice(-10).reverse())
const lessonsRead = (id: number, n: number) => Array.from({ length: n }, (_, i) => lessonId(id, i)).filter(k => state.read[k]).length
const quizPill = (q: number) => (q >= 80 ? 'ok' : q >= 70 ? 'warn' : 'bad')
</script>

<template>
  <div class="stack">
    <div class="stack" style="gap:6px">
      <div class="eyebrow">{{ t.meta }}</div>
      <h1>{{ t.dashTitle }}</h1>
    </div>
    <div class="notice">{{ t.notice }}</div>

    <div class="kpis">
      <div class="panel kpi"><div class="v">{{ readCount }} / {{ totalLessons }}</div><div class="l">{{ t.lessonsRead }}</div></div>
      <div class="panel kpi"><div class="v">{{ avgQuiz }}</div><div class="l">{{ t.quizAvg }}</div></div>
      <div class="panel kpi">
        <div class="v">{{ last ? last.scaled + ' / 1000' : '—' }}</div>
        <div class="l">{{ last ? t.lastExam(last.scaled >= 720) : t.noExam }}</div>
      </div>
      <div class="panel kpi"><div class="v">{{ state.missed.length }}</div><div class="l">{{ t.toReview }}</div></div>
    </div>

    <div v-if="next" class="panel row" style="justify-content:space-between">
      <div class="stack" style="gap:2px">
        <div class="eyebrow">{{ t.nextLesson }}</div>
        <div><span class="dcode">D{{ next.d.id }}</span> {{ lessonsOf(next.d)[next.i].t }}</div>
      </div>
      <button class="btn" @click="go('course', { d: next.d.id, i: next.i })">{{ t.cont }}</button>
    </div>
    <div v-else class="panel">{{ t.allRead }}</div>

    <h2>{{ t.byWeight }}</h2>
    <div class="panel scroll" style="padding:6px 10px">
      <table>
        <tr><th>{{ t.hDomain }}</th><th>{{ t.hWeight }}</th><th>{{ t.hLessons }}</th><th>{{ t.hBest }}</th><th></th></tr>
        <tr v-for="d in sorted" :key="d.id">
          <td><span class="dcode">D{{ d.id }}</span> {{ dName(d.id) }}</td>
          <td class="num">
            <div class="row" style="gap:8px;flex-wrap:nowrap">{{ d.w.toFixed(1) }} %
              <div class="bar" style="width:70px"><i :style="{ width: (d.w / 33.1) * 100 + '%' }"></i></div>
            </div>
          </td>
          <td class="num">{{ lessonsRead(d.id, d.lessons.length) }} / {{ d.lessons.length }}</td>
          <td class="num">
            <span v-if="state.quiz[d.id] == null" class="pill">{{ t.notDone }}</span>
            <span v-else :class="['pill', quizPill(state.quiz[d.id])]">{{ state.quiz[d.id] }} %</span>
          </td>
          <td>
            <div class="row" style="gap:6px;flex-wrap:nowrap">
              <button class="btn ghost" @click="go('course', { d: d.id, i: 0 })">{{ t.course }}</button>
              <button class="btn ghost" @click="startDomainQuiz(d.id)">{{ t.quiz }}</button>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <div class="row" style="justify-content:space-between">
      <h2>{{ t.plan4 }}</h2>
      <div class="row" style="gap:8px">
        <label for="exam-date">{{ t.examDate }}</label>
        <input id="exam-date" v-model="state.examDate" type="date">
        <span class="pill warn">{{ t.daysLeft(daysTo(state.examDate)) }}</span>
      </div>
    </div>
    <div class="kpis" style="grid-template-columns:repeat(auto-fit,minmax(230px,1fr))">
      <div v-for="(p, k) in plan" :key="k" class="panel stack" :style="{ gap: '8px', opacity: state.done[k] ? 0.55 : 1 }">
        <div class="row" style="justify-content:space-between">
          <div class="eyebrow">{{ p.w }}</div>
          <label class="choice" :for="'day-' + k" style="font-size:13px">
            <input :id="'day-' + k" v-model="state.done[k]" type="checkbox">{{ t.dayDone }}
          </label>
        </div>
        <h3>{{ p.t }}</h3>
        <ul style="margin:0;padding-left:18px;font-size:14px"><li v-for="it in p.items" :key="it">{{ it }}</li></ul>
      </div>
    </div>

    <div v-if="history.length" class="stack">
      <h2>{{ t.history }}</h2>
      <div class="panel scroll" style="padding:6px 10px">
        <table>
          <tr><th>{{ t.hDate }}</th><th>{{ t.hQ }}</th><th>{{ t.hOk }}</th><th>{{ t.hScore }}</th></tr>
          <tr v-for="x in history" :key="x.date">
            <td class="num">{{ new Date(x.date).toLocaleString(t.locale) }}</td>
            <td class="num">{{ x.n }}</td>
            <td class="num">{{ x.ok }} ({{ pct(x.ok, x.n) }} %)</td>
            <td class="num"><span :class="['pill', x.scaled >= 720 ? 'ok' : 'bad']">{{ x.scaled }}</span></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
