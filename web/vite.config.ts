import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2022"
  },
  esbuild: {
    supported: {
      'top-level-await': true
    },
  },
  preview: {
    host: true,
    port:8080
  }
})
