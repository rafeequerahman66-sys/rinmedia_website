import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import brandLogos from './scripts/vite-plugin-brand-logos.js'

export default defineConfig({
  plugins: [react(), tailwindcss(), brandLogos()],
})
