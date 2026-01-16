import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative paths work on shared hosting like Fasthosts
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});