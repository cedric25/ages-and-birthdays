export function getOrUpdateBrowserPushServiceSubscription() {
  console.log('getOrUpdateBrowserPushServiceSubscription')
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .getRegistration()
      .then(function (sw) {
        sw.pushManager.getSubscription().then(function (sub) {
          if (sub === null) {
            // Update UI to ask user to register for Push
            console.log('Not subscribed to push service!')
          } else {
            // We have a subscription, update the database
            console.log('Subscription object: ', sub)
            // TODO Call Firebase
          }
        })
      })
      .catch(function (err) {
        console.log("Can't get service worker reference: ", err)
      })
  }
}

export function subscribeUser() {
  console.log('subscribeUser')
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (reg) {
      reg.pushManager
        .subscribe({
          userVisibleOnly: true,
        })
        .then(function (sub) {
          console.log('Endpoint URL: ', sub.endpoint)
        })
        .catch(function (e) {
          if (Notification.permission === 'denied') {
            console.warn('Permission for notifications was denied')
          } else {
            console.error('Unable to subscribe to push', e)
          }
        })
    })
  }
}
