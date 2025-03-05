import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prismjs from 'vite-plugin-prismjs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prismjs({
      languages: [ 'javascript', 'css', 'markup' ],
      plugins: [ 'line-numbers' ],
      theme: 'tomorrow',
      css: true,
    }),
  ],
})
