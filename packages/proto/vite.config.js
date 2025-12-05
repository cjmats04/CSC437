import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        venues: resolve(__dirname, 'venues.html'),
        artists: resolve(__dirname, 'artists.html'),
        concerts: resolve(__dirname, 'concerts.html'),
        tickets: resolve(__dirname, 'tickets.html'),
        genres: resolve(__dirname, 'genres.html'),
        login: resolve(__dirname, 'login.html'),
        newuser: resolve(__dirname, 'newuser.html'),
      },
    },
  },
})