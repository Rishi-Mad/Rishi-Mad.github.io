import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import monicon from '@monicon/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Rishi-Mad.github.io/',
  plugins: [react(), tailwindcss(), monicon({
    collections: ["mingcute", "octicon"]
  })],
})
