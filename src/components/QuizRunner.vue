<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { isRight, scaledScore, type Prepared } from '../lib/exam'
import { t, tq, dName, track, type QuizConfig } from '../store'
import QuizResult, { type ResultRow } from './QuizResult.vue'

const props = defineProps<{ cfg: QuizConfig }>()
const items: Prepared[] = props.cfg.items
const exam = props.cfg.mode === 'exam'

const i = ref(0)
const sel = reactive(items.map(() => new Set<number>()))
const checked = reactive(items.map(() => false))
const flag = reactive(items.map(() => false))
const confirmEnd = ref(false)
const result = ref<{ rows: ResultRow[]; ok: number; n: number; scaled: number } | null>(null)

const item = computed(() => items[i.value])
const q = computed(() => tq(item.value.q))
const multi = computed(() => q.value.a.length > 1)
const cur = computed(() => sel[i.value])
const done = computed(() => checked[i.value])
const answered = computed(() => sel.filter(s => s.size).length)
const canValidate = computed(() => (multi.value ? cur.value.size === q.value.a.length : cur.value.size > 0))

/* ---------- chrono ---------- */
const end = props.cfg.minutes ? Date.now() + props.cfg.minutes * 60000 : null
const now = ref(Date.now())
const remaining = computed(() => (end ? Math.max(0, Math.round((end - now.value) / 1000)) : 0))
const clock = computed(() => `${String(Math.floor(remaining.value / 60)).padStart(2, '0')}:${String(remaining.value % 60).padStart(2, '0')}`)
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  if (end) timer = setInterval(() => { now.value = Date.now(); if (remaining.value === 0) finish() }, 1000)
})
onUnmounted(() => clearInterval(timer))

function toggle(k: number) {
  const s = cur.value
  if (multi.value) { if (s.has(k)) s.delete(k); else s.add(k) } else { s.clear(); s.add(k) }
}

function optClass(k: number) {
  const c = ['opt']
  if (cur.value.has(k)) c.push('sel')
  if (done.value) { if (item.value.correct.has(k)) c.push('right'); else if (cur.value.has(k)) c.push('wrong') }
  return c
}

function navClass(k: number) {
  const c: string[] = []
  if (k === i.value) c.push('cur')
  if (sel[k].size) c.push('ans')
  if (flag[k]) c.push('flag')
  if (!exam && checked[k]) c.push(isRight(items[k], sel[k]) ? 'r' : 'w')
  return c
}

function validate() {
  checked[i.value] = true
  track(item.value.q.id, isRight(item.value, cur.value))
}

function endClick() {
  if (exam && !confirmEnd.value) { confirmEnd.value = true; return }
  finish()
}

function finish() {
  if (result.value) return
  clearInterval(timer)
  const rows = items.map((it, k) => ({ it, sel: sel[k], ok: isRight(it, sel[k]) }))
  rows.forEach(r => track(r.it.q.id, r.ok))
  const ok = rows.filter(r => r.ok).length
  const n = rows.length
  const scaled = scaledScore(ok, n)
  props.cfg.onDone?.(ok, n, scaled)
  result.value = { rows, ok, n, scaled }
  window.scrollTo(0, 0)
}
</script>

<template>
  <QuizResult v-if="result" :cfg="cfg" v-bind="result" />
  <div v-else class="quiz">
    <div class="qhead">
      <div class="stack" style="gap:2px">
        <div class="eyebrow">{{ cfg.title() }}</div>
        <div class="muted">{{ t.qn(i + 1, items.length, answered) }}</div>
      </div>
      <span v-if="end" :class="['timer', { low: remaining < 300 }]">{{ clock }}</span>
      <span v-else class="pill">{{ exam ? t.exam : t.practice }}</span>
    </div>

    <div class="row" style="gap:8px">
      <span class="dcode">D{{ q.d }} · {{ dName(q.d) }}</span>
      <span v-if="multi" class="pill warn">{{ t.chooseN(q.a.length) }}</span>
    </div>
    <p class="qtext">{{ q.q }}</p>

    <div class="opts" :role="multi ? 'group' : 'radiogroup'">
      <label v-for="(oi, k) in item.order" :key="`${i}-${k}`" :class="optClass(k)" :for="`q${i}o${k}`">
        <input
          :id="`q${i}o${k}`" :type="multi ? 'checkbox' : 'radio'" :name="`q${i}`"
          :checked="cur.has(k)" :disabled="done" @change="toggle(k)"
        >
        <span class="lt">{{ 'ABCDEF'[k] }}</span><span>{{ q.o[oi] }}</span>
      </label>
    </div>

    <div v-if="done" :class="['expl', isRight(item, cur) ? 'ok' : 'bad']">
      <b>{{ isRight(item, cur) ? t.correct : t.incorrect }}</b>{{ q.e }}
    </div>

    <div class="row">
      <button class="btn ghost" :disabled="i === 0" @click="i--">{{ t.prev }}</button>
      <button v-if="!exam && !done" class="btn" :disabled="!canValidate" @click="validate">{{ t.validate }}</button>
      <button v-if="(exam || done) && i < items.length - 1" class="btn" @click="i++">{{ t.next }}</button>
      <button v-if="exam" class="btn ghost" @click="flag[i] = !flag[i]">{{ flag[i] ? t.unflag : t.flag }}</button>
      <button v-if="exam || checked.every(Boolean)" :class="exam ? 'btn ghost' : 'btn'" @click="endClick">
        {{ exam ? (confirmEnd ? t.confirmEnd : t.endExam) : t.seeResult }}
      </button>
    </div>
    <div v-if="exam && confirmEnd" class="notice">{{ t.endNotice(items.length - answered, flag.filter(Boolean).length) }}</div>

    <div v-if="items.length > 1" class="qnav" :aria-label="t.qnav">
      <button v-for="(_, k) in items" :key="k" :class="navClass(k)" :aria-label="t.qLabel(k + 1)" @click="i = k">{{ k + 1 }}</button>
    </div>
  </div>
</template>
