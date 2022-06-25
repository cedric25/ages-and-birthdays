// To tell WebStorm about the Vite config alias
// Until WebStorm can understand Vite config like it does with webpack :)
System.config({
  paths: {
    '@/*': './src/*',
  },
})
