import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, '../server/dist/client'),
    rollupOptions: {
      input: resolve(__dirname, 'index.html')
    }
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: resolve(__dirname, 'client/src/tests/setUp.ts')
  }
})
