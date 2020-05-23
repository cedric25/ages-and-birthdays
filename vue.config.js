module.exports = {
  pwa: {
    name: 'Birthdays',
    themeColor: '#1976D2',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    manifestOptions: {
      gcm_sender_id: '302369470244', // Copied from Firebase console > Project Settings > Cloud Messaging
    },

    // https://cli.vuejs.org/core-plugins/pwa.html#configuration
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/service-worker.js',
      // ...other Workbox options...
    },
  },
}
