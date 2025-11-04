import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Configuração para GitHub Pages
  base: '/Preta_Doces_e_Salgados/',

  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    allowedHosts: ["5173-igvvqb4ipvnnul0dmoklq-8f16df96.manus.computer", "5173-ihq5gxo95rjy7vi7ozcbr-5a7a77bf.manus.computer"]

  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react']
  }
})
