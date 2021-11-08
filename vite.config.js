import path from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import Components from 'unplugin-vue-components/vite'
import { VitePWA } from 'vite-plugin-pwa'
import visualizer from 'rollup-plugin-visualizer'

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [
    createVuePlugin(),
    Components({
      dirs: ['src/components'],
    }),
    VitePWA({
      // /!\ Don't remove that or users might never get new content!
      // Unless you want to replace that with a manual "Refresh" button.
      // -> https://github.com/antfu/vite-plugin-pwa
      registerType: 'autoUpdate',
      manifest: false,
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
})
