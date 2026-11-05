import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // chemins relatifs : fonctionne sur https://<user>.github.io/<dépôt>/
  base: './',
  plugins: [vue()],
  test: { include: ['src/**/*.test.ts'] },
})
