import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      config.browsers.push({
        name: 'brave',
        family: 'chromium',
        channel: 'stable',
        displayName: 'Brave',
        // Chemin Windows pour Brave - ajustez si nécessaire
        path: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
        version: '1.0.0',
        majorVersion: 1,
        isHeaded: true,
        isHeadless: false
      });
      
      return config;
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
})