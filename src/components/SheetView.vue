<script setup lang="ts">
import { computed } from 'vue'
import { BLUEPRINT, SHEET_TXT, SOURCES } from '../data/sheet'
import { state, dName } from '../store'

const x = computed(() => SHEET_TXT[state.lang])
</script>

<template>
  <div class="stack" style="max-width:900px">
    <div class="eyebrow">{{ x.eyebrow }}</div>
    <h1>{{ x.title }}</h1>

    <h2>{{ x.fmt }}</h2>
    <div class="panel scroll" style="padding:6px 10px">
      <table>
        <tr v-for="[k, v] in x.rows" :key="k"><td style="font-weight:600;white-space:nowrap">{{ k }}</td><td>{{ v }}</td></tr>
      </table>
    </div>

    <h2>{{ x.bp }}</h2>
    <div class="panel scroll" style="padding:6px 10px">
      <table>
        <tr><th v-for="c in x.bpH" :key="c">{{ c }}</th></tr>
        <tr v-for="[d, fr, en, w] in BLUEPRINT" :key="fr">
          <td><span class="dcode">D{{ d }}</span> {{ dName(d) }}</td>
          <td>{{ state.lang === 'en' ? en : fr }}</td>
          <td class="num">{{ w.toFixed(1) }} %</td>
        </tr>
      </table>
    </div>

    <h2>{{ x.keysT }}</h2>
    <div class="panel"><ul class="sheet-list"><li v-for="k in x.keys" :key="k">{{ k }}</li></ul></div>

    <h2>{{ x.timeT }}</h2>
    <div class="panel"><ul class="sheet-list"><li v-for="k in x.time" :key="k">{{ k }}</li></ul></div>

    <h2>{{ x.srcT }}</h2>
    <div class="panel">
      <ul class="sheet-list">
        <li v-for="[l, u] in SOURCES" :key="u"><a :href="u" target="_blank" rel="noopener">{{ l }}</a></li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.sheet-list { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 6px }
</style>
