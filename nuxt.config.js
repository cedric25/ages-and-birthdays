const nodeExternals = require('webpack-node-externals')

module.exports = {
  /**
   * Headers of the page
   */
  head: {
    title: 'ages-and-birthdays',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Can&apos;t remember ages and birthdays? Me neither...' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
    ]
  },
  /**
   * Customize the progress bar color
   */
  loading: { color: '#3B8070' },
  /**
   * Build configuration
   */
  build: {
    vendor: ['vuetify'],
    extractCSS: true,
    analyze: true,
    /**
     * Run ESLint on save
     */
    extend (config, { isDev, isClient, isServer }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    },
    babel: {
      "plugins": [
        ["transform-imports", {
          "vuetify": {
            "transform": "vuetify/es5/components/${member}",
            "preventFullImport": true
          }
        }]
      ]
    }
  },
  plugins: [
    '~/plugins/vuetify',
    { src: '~/plugins/localStorage.js', ssr: false }
  ],
  css: ['~/assets/style/app.styl']
}
