import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// For GitHub Pages: change base to '/your-repo-name/'
// For custom domain: change base to '/'
// You can also create a .env file with VITE_BASE_PATH=/your-repo-name/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    base: env.VITE_BASE_PATH || '/portofolio/',
  }
})

