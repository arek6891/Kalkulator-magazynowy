
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Ładuje zmienne środowiskowe, aby były dostępne podczas budowania
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    server: {
      host: true, // To pozwala na dostęp z sieci lokalnej (telefonu)
      port: 5173  // Domyślny port
    },
    define: {
      // Przekazuje API_KEY z Vercel/Systemu do aplikacji React
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})