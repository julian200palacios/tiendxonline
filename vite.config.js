import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Carga variables de entorno VITE_*
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      host: true,          // permite conexiones desde red/WSL (0.0.0.0)
      port: 5173,          // puerto explícito
      strictPort: false,   // si 5173 ocupado, buscar otro (true evitaría buscar otro)
      open: false,         // true para abrir navegador automáticamente
      hmr: {
        protocol: 'ws',    // 'wss' si usas https en dev
        host: 'localhost', // ajustar si accedes por IP distinta
        port: 5173,
      },
      // Opcional: aumente tolerancia del watcher en FS lentos (WSL/OneDrive)
      watch: {
        usePolling: true,
        interval: 100,
      }
    }
  }
})
