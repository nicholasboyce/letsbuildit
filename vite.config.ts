import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, 'client'),
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, 'src/main/resources/static'),
    rollupOptions: {
      input: resolve(__dirname, 'client/index.html')
    }
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: resolve(__dirname, 'client/src/tests/setUp.ts')
  }
})
