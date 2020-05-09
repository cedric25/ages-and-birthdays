<template>
  <div>
    <TopMenu />

    <div style="padding-top: 56px;">
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
  import TopMenu from './components/TopMenu/TopMenu'

  export default {
    components: {
      TopMenu,
    },
    mounted() {
      console.log('mounted, Notification.permission:', Notification.permission)
      if (Notification.permission !== 'granted') {
        Notification.requestPermission(function (status) {
          console.log('Notification permission status:', status)

          setTimeout(() => {
            this.displayNotification()
          })
        })
      } else {
        this.displayNotification()
      }
    },
    methods: {
      displayNotification() {
        if (Notification.permission === 'granted') {
          navigator.serviceWorker.getRegistration().then(function (reg) {
            console.log('here', reg)
            var options = {
              // body: 'Here is a notification body!',
              icon: 'favicon.ico',
              vibrate: [100, 50, 100],
              data: {
                dateOfArrival: Date.now(),
                primaryKey: 1,
              },
              actions: [
                {
                  action: 'explore',
                  title: 'Go to app',
                  icon: 'images/checkmark.png',
                },
                { action: 'close', title: 'Close notification', icon: 'images/xmark.png' },
              ],
            }
            reg.showNotification('Tommy is turning 23 today!', options)
          })
        }
      },
    },
  }
</script>

<style lang="scss">
  @import 'assets/styles/global.scss';
</style>
