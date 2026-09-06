import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Ignore large media files and the nested Next.js project to prevent EBUSY errors
      ignored: ['**/final.mp4', '**/neha-portfolio/**'],
    },
  },
})
