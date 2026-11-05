<script setup lang="ts">
import type { Component } from 'vue'
import { nav, state, t, go, theme, VIEWS, type View } from './store'
import DashboardView from './components/DashboardView.vue'
import CourseView from './components/CourseView.vue'
import ExamSetup from './components/ExamSetup.vue'
import ErrorsView from './components/ErrorsView.vue'
import TrapsView from './components/TrapsView.vue'
import SheetView from './components/SheetView.vue'
import QuizRunner from './components/QuizRunner.vue'

const views: Record<View, Component> = {
  dash: DashboardView, course: CourseView, exam: ExamSetup,
  errors: ErrorsView, traps: TrapsView, sheet: SheetView,
}
</script>

<template>
  <header class="top">
    <div class="wrap">
      <div class="brand">CCDV-F Trainer <small>CLAUDE CERTIFIED DEVELOPER – FOUNDATIONS</small></div>
      <nav class="tabs">
        <button v-for="(v, i) in VIEWS" :key="v" :aria-current="nav.view === v ? 'true' : 'false'" @click="go(v)">{{ t.tabs[i] }}</button>
        <span class="lang" role="group" aria-label="Langue / Language">
          <button v-for="l in (['fr', 'en'] as const)" :key="l" :aria-pressed="state.lang === l ? 'true' : 'false'" @click="state.lang = l">{{ l.toUpperCase() }}</button>
        </span>
        <span class="lang" role="group" :aria-label="t.themeL">
          <button :aria-pressed="theme === 'light' ? 'true' : 'false'" :aria-label="t.light" :title="t.light" @click="state.theme = 'light'">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          </button>
          <button :aria-pressed="theme === 'dark' ? 'true' : 'false'" :aria-label="t.dark" :title="t.dark" @click="state.theme = 'dark'">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
          </button>
        </span>
      </nav>
    </div>
  </header>
  <main class="wrap">
    <QuizRunner v-if="nav.quiz" :key="nav.key" :cfg="nav.quiz" />
    <component :is="views[nav.view]" v-else />
  </main>
</template>
