import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Ładuje zmienne środowiskowe z plików .env (dla lokalnego developmentu)
  // Use '.' instead of process.cwd() to prevent TypeScript error about missing 'cwd' on Process type
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react()],
    server: {
      host: true,
      port: 5173
    },
    define: {
      // Priorytet: 1. Zmienna systemowa (Vercel) 2. Zmienna z pliku .env (Lokalnie)
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY || env.API_KEY)
    }
  }
})