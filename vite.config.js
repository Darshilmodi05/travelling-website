import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Load env file from the current directory
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/brevo-api': {
          target: 'https://api.brevo.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/brevo-api/, ''),
          headers: {
            'api-key': env.VITE_BREVO_API_KEY,
          }
        }
      }
    }
  }
})
