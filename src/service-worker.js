/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

workbox.core.setCacheNameDetails({ prefix: 'ages-and-birthdays' })

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// --- Handle PUSH NOTIFICATIONS
// https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications

// 1- Subscribe to the browser "push service"

// 2- When receiving a push notification from the browser "push service"
self.addEventListener('push', function (e) {
  const options = {
    body: 'This notification was generated from a push!',
    icon: 'images/example.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2',
    },
    actions: [
      { action: 'explore', title: 'Explore this new world', icon: 'images/checkmark.png' },
      { action: 'close', title: 'Close', icon: 'images/xmark.png' },
    ],
  }
  e.waitUntil(self.registration.showNotification('Hello world!', options))
})

// 3- When a push notification is clicked
self.addEventListener('notificationclick', function (e) {
  console.log('ici ! (notificationclick)')
  const notification = e.notification
  // var primaryKey = notification.data.primaryKey
  const action = e.action

  if (action === 'close') {
    notification.close()
  } else {
    clients.openWindow('https://ages-and-birthdays.netlify.app/')
    notification.close()
  }
})

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
