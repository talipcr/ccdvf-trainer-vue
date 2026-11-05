<script setup lang="ts">
import { computed } from 'vue'
import { TRAPS } from '../data/content.fr'
import { EN } from '../data/content.en'
import { state, t } from '../store'

const traps = computed(() => (state.lang === 'en' ? EN.traps : TRAPS))
</script>

<template>
  <div class="stack" style="max-width:820px">
    <div class="eyebrow">{{ t.trapEyebrow }}</div>
    <h1>{{ t.trapTitle }}</h1>
    <div class="panel scroll" style="padding:6px 10px">
      <table>
        <tr><th>{{ t.hTrap }}</th><th>{{ t.hReflex }}</th></tr>
        <tr v-for="[a, b] in traps" :key="a"><td style="font-weight:600">{{ a }}</td><td>{{ b }}</td></tr>
      </table>
    </div>
    <div class="panel stack" style="gap:8px">
      <h3>{{ t.fmt }}</h3>
      <ul style="margin:0;padding-left:18px"><li v-for="x in t.fmtItems" :key="x">{{ x }}</li></ul>
    </div>
  </div>
</template>
