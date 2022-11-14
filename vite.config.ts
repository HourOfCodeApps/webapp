import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: ['VITE_', 'FIREBASE_', 'GOOGLE_'],
  root: 'src',
  publicDir: false,
  envDir: '../',
  build: {
    outDir: '../dist',
    rollupOptions: {
      external: [
        '@material-ui/styles',
      ],
    },
  },
  // TODO: remove
  define: {
    global: 'window'
  },
  plugins: [tsconfigPaths({root: '../'}), react()],
})
