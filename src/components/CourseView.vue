<script setup lang="ts">
import { computed } from 'vue'
import { DOMAINS, QUESTIONS } from '../data/content.fr'
import { nav, state, t, dom, dName, lessonsOf, lessonId, go, startDomainQuiz } from '../store'

const d = computed(() => dom(nav.course.d))
const lessons = computed(() => lessonsOf(d.value))
const lesson = computed(() => lessons.value[nav.course.i])
const isLast = computed(() => nav.course.i === lessons.value.length - 1)
const nextTarget = computed(() => {
  if (!isLast.value) return { d: d.value.id, i: nav.course.i + 1 }
  const nd = DOMAINS[DOMAINS.indexOf(d.value) + 1]
  return nd ? { d: nd.id, i: 0 } : null
})
const isRead = computed(() => !!state.read[lessonId(d.value.id, nav.course.i)])
const quizCount = (id: number) => QUESTIONS.filter(q => q.d === id).length

function markRead() {
  state.read[lessonId(d.value.id, nav.course.i)] = true
  if (isLast.value) startDomainQuiz(d.value.id)
  else go('course', nextTarget.value!)
}
</script>

<template>
  <div class="course">
    <nav class="toc panel" :aria-label="t.toc">
      <details v-for="x in DOMAINS" :key="x.id" :open="x.id === d.id || undefined">
        <summary>
          <span class="dcode">D{{ x.id }}</span><span>{{ dName(x.id) }}</span>
          <span class="muted" style="margin-left:auto;font-size:12px;font-weight:400">{{ x.w }} %</span>
        </summary>
        <button
          v-for="(l, i) in lessonsOf(x)" :key="i" class="lesson-link"
          :aria-current="x.id === d.id && i === nav.course.i ? 'true' : 'false'" @click="go('course', { d: x.id, i })"
        >
          <span class="ck">{{ state.read[lessonId(x.id, i)] ? '✓' : '' }}</span>{{ l.t }}
        </button>
        <button class="lesson-link" style="color:var(--ink);font-weight:600" @click="startDomainQuiz(x.id)">
          <span class="ck"></span>{{ t.domainQuiz(quizCount(x.id)) }}
        </button>
      </details>
    </nav>

    <article class="lesson">
      <div class="eyebrow">D{{ d.id }} · {{ dName(d.id) }} · {{ t.lessonN(nav.course.i + 1, lessons.length) }}</div>
      <h1>{{ lesson.t }}</h1>
      <!-- contenu statique du dépôt (pas d'entrée utilisateur) -->
      <div class="stack" style="gap:12px" v-html="lesson.h"></div>
      <div class="row" style="margin-top:12px;border-top:1px solid var(--line);padding-top:16px">
        <button class="btn" @click="markRead">{{ isLast ? t.markQuiz(d.id) : t.markNext }}</button>
        <span v-if="isRead" class="pill ok">{{ t.read }}</span>
        <button v-if="isLast && nextTarget" class="btn ghost" @click="go('course', nextTarget)">{{ t.nextDomain }}</button>
      </div>
    </article>
  </div>
</template>
