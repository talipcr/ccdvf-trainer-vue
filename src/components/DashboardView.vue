<script setup lang="ts">
import { computed, ref } from 'vue'
import { DOMAINS, PLAN, QUESTIONS } from '../data/content.fr'
import { EN } from '../data/content.en'
import { daysTo, pct, sprintDay } from '../lib/exam'
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
const sel = ref(next.value ? next.value.d.id : DOMAINS[0].id)
const selDom = computed(() => DOMAINS.find(d => d.id === sel.value)!)
const selPct = computed(() => pct(lessonsRead(sel.value, selDom.value.lessons.length), selDom.value.lessons.length))
const selNext = computed(() => selDom.value.lessons.findIndex((_, i) => !state.read[lessonId(sel.value, i)]))
const selLeft = computed(() => selDom.value.lessons.length - lessonsRead(sel.value, selDom.value.lessons.length))
const selQuizN = computed(() => QUESTIONS.filter(q => q.d === sel.value).length)
const selMissed = computed(() => QUESTIONS.filter(q => q.d === sel.value && state.missed.includes(q.id)).length)
// temps de lecture estimé : 200 mots / min
const readMin = (h: string) => Math.max(1, Math.round(h.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 200))
const plan = computed(() => (state.lang === 'en' ? EN.plan : PLAN))
const history = computed(() => state.exams.slice(-10).reverse())
const lessonsRead = (id: number, n: number) => Array.from({ length: n }, (_, i) => lessonId(id, i)).filter(k => state.read[k]).length
const dayLabel = (k: number, fallback: string) => {
  const d = sprintDay(state.examDate, k, plan.value.length)
  return d ? d.toLocaleDateString(t.value.locale, { weekday: 'short', day: 'numeric', month: 'short' }) : fallback
}
const quizPill = (q: number) => (q >= 80 ? 'ok' : q >= 70 ? 'warn' : 'bad')
</script>

<template>
  <div class="stack">
    <div class="stack" style="gap:6px">
      <div class="eyebrow">{{ t.meta }}</div>
      <h1>{{ t.dashTitle }}</h1>
    </div>
    <section class="panel cd">
      <div class="cd-label">{{ t.hDomain }}</div>
      <div class="cd-mods" role="group" :aria-label="t.hDomain">
        <button
          v-for="x in DOMAINS" :key="x.id" class="cd-mod" :aria-pressed="sel === x.id ? 'true' : 'false'"
          :title="dName(x.id)" @click="sel = x.id"
        >
          <span class="cd-ic" aria-hidden="true">{{ lessonsRead(x.id, x.lessons.length) === x.lessons.length ? '✓' : '' }}</span>{{ x.id }}
        </button>
      </div>

      <div class="cd-done">{{ selPct }} % {{ t.domainDone }}</div>
      <div class="cd-bar"><i :style="{ width: selPct + '%' }"></i></div>
      <div class="cd-sub">{{ t.lessonsLeft(selLeft) }}</div>

      <div class="cd-acts">
        <button class="cd-act" @click="startDomainQuiz(sel)">
          <span class="cd-tile" aria-hidden="true">?</span>
          <span><span class="cd-act-t">{{ t.domainQuiz(selQuizN) }}</span><span class="cd-act-v">{{ state.quiz[sel] == null ? t.notDone : t.hBest + ' : ' + state.quiz[sel] + ' %' }}</span></span>
        </button>
        <button class="cd-act" @click="go('errors')">
          <span class="cd-tile" aria-hidden="true">↺</span>
          <span><span class="cd-act-t">{{ t.toReview }}</span><span class="cd-act-v">{{ selMissed }}</span></span>
        </button>
      </div>

      <div class="cd-sep"><span>{{ t.upNext }}</span></div>

      <div class="cd-next">
        <h3>{{ selNext >= 0 ? lessonsOf(selDom)[selNext].t : t.domainAllRead }}</h3>
        <div class="cd-meta">
          <template v-if="selNext >= 0">
            <span class="cd-chip"><span aria-hidden="true">▶</span> {{ t.lessonN(selNext + 1, selDom.lessons.length) }}</span>
            <span class="cd-chip">{{ t.minutes(readMin(lessonsOf(selDom)[selNext].h)) }}</span>
            <button class="cd-cta" @click="go('course', { d: sel, i: selNext })">{{ t.cont }}</button>
          </template>
          <template v-else>
            <span class="cd-chip">{{ selQuizN }} questions</span>
            <button class="cd-cta" @click="startDomainQuiz(sel)">{{ t.quiz }}</button>
          </template>
        </div>
      </div>

      <h3 class="cd-title">D{{ sel }} · {{ dName(sel) }}</h3>
      <ol class="cd-list">
        <li v-for="(l, i) in lessonsOf(selDom)" :key="i">
          <button @click="go('course', { d: sel, i })">
            <span :class="['cd-ck', { on: state.read[lessonId(sel, i)] }]" aria-hidden="true">{{ state.read[lessonId(sel, i)] ? '✓' : i + 1 }}</span>
            <span>{{ l.t }}</span>
            <span class="muted cd-min">{{ t.minutes(readMin(l.h)) }}</span>
          </button>
        </li>
      </ol>
    </section>

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
          <div class="eyebrow">{{ dayLabel(k, p.w) }}</div>
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
