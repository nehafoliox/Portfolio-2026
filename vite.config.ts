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
  build: {
    // Vercel: smaller chunks + modern minify + no oversized-asset warnings for video
    target: 'es2020',
    minify: 'esbuild',
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // only tiny assets inline; webp/mp4 stay as files with hashes
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          smooth: ['lenis'],
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
})
