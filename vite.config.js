import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/ai-api': {
        target: 'https://imarafund-api-443679739700.europe-west1.run.app',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/ai-api/, ''),
      },
    },
  },
})
