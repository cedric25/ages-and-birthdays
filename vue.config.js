module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/ages-and-birthdays/'
    : '/',
  pwa: {
    workboxPluginMode: 'GenerateSW',
    name: 'Birthdays',
    themeColor: '#1976D2',
  },
}
