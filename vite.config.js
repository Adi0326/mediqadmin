import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Add this to ensure assets load correctly on your subdomain
  server: {
    port: 5174
  }
})