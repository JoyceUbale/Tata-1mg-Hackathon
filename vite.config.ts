// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
console.log(path.resolve(__dirname, 'src/catalyst/providers/CatalystProvider.tsx'));
export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: {
      include: [/node_modules/, /catalyst-core/],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@api': path.resolve(__dirname, 'lib/api.js'),
      '@containers': path.resolve(__dirname, 'src/js/containers'),
      '@lib': path.resolve(__dirname, 'src/lib') // 👈 This is required for '@/lib/utils'
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
  }
});
