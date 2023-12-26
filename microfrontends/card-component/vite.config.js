import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "card_component",
      filename: "remoteEntry.js",
      exposes: {
        './Card': './src/components/Card'
      },
      shared: ['react','react-dom']
    })
  ],
  preview: {
    host: 'localhost',
    port: 5000,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
