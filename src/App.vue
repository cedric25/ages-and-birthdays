<template>
  <div>
    <TopMenu />

    <div style="padding-top: 56px;">
      <div class="text-right mt-4 mr-4">
        <button type="button" class="btn" @click="displayNotification">
          Test notif
        </button>
      </div>
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
  import {
    getOrUpdateBrowserPushServiceSubscription,
    subscribeUser,
  } from './helpers/pushApi/pushApi'

  import TopMenu from './components/TopMenu/TopMenu'

  export default {
    components: {
      TopMenu,
    },
    created() {
      getOrUpdateBrowserPushServiceSubscription()
    },
    mounted() {
      console.log('mounted, Notification.permission:', Notification.permission)
      if (Notification.permission !== 'granted') {
        Notification.requestPermission(status => {
          console.log('Notification permission status:', status)

          // Test
          // setTimeout(() => {
          //   this.displayNotification()
          // }, 1000)

          if (status === 'granted') {
            subscribeUser()
          }
        })
      } else {
        this.displayNotification()
      }
    },
    methods: {
      displayNotification() {
        if (Notification.permission === 'granted') {
          navigator.serviceWorker.getRegistration().then(function (sw) {
            if (!sw) {
              console.log('/!\\ --> No service-worker running? Are you on local?...')
              return
            }
            const options = {
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
                  title: 'See in Birthdays',
                  // icon: 'images/checkmark.png',
                },
              ],
            }
            sw.showNotification('Tommy is turning 23 today!', options)
          })
        }
      },
    },
  }
</script>

<style lang="scss">
  @import 'assets/styles/global.scss';
</style>
