import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command, isPreview }) => ({
  // GitHub Pages serves the site from /PersonalUniversity/; only the dev server uses /.
  base: command === 'serve' && !isPreview ? '/' : '/PersonalUniversity/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': '/src' },
  },
  build: {
    // The curriculum data is one large chunk by design (all subjects are needed for
    // search, recommendations and the dashboard); splitting it from the libraries and
    // app code means editing a lesson only invalidates that chunk in the browser cache.
    chunkSizeWarningLimit: 6000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const p = id.split(String.fromCharCode(92)).join('/');
          if (p.includes('/src/data/subjects/') || p.includes('/src/data/coursework/')) return 'curriculum';
          if (p.includes('/node_modules/katex/')) return 'katex';
          if (p.includes('/node_modules/')) return 'vendor';
        },
      },
    },
  },
}));
