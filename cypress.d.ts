import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // URL de base de votre app Vite
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});