import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VitePWA } from 'vite-plugin-pwa'
import visualizer from 'rollup-plugin-visualizer'

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components'],
      dts: true,
    }),
    VitePWA({
      // /!\ Don't remove that or users might never get new content!
      // Unless you want to replace that with a manual "Refresh" button.
      // -> https://github.com/antfu/vite-plugin-pwa
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Ages & Birthdays',
        short_name: 'Birthdays',
        description: 'Finally a place to track and organize birthdays.',
        theme_color: '#1976D2',
        icons: [
          {
            src: 'img/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'img/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),

    visualizer(),
  ],

  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },

  build: {
    chunkSizeWarningLimit: 1000,
  },

  test: {
    globals: true,
    // environment: 'happy-dom', // Doesn't seem to work because of nanoid using crypto...
    environment: 'jsdom',
    setupFiles: ['./test/unit/setup.ts'],
  },
})
