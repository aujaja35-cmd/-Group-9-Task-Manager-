import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/Group-9-Task-Manager/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
