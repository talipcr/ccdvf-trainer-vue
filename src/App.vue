<script setup lang="ts">
import type { Component } from 'vue'
import { nav, state, t, go, VIEWS, type View } from './store'
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
      </nav>
    </div>
  </header>
  <main class="wrap">
    <QuizRunner v-if="nav.quiz" :key="nav.key" :cfg="nav.quiz" />
    <component :is="views[nav.view]" v-else />
  </main>
</template>
