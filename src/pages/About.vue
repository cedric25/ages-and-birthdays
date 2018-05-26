<template>
  <transition name="fade">
    <ab-full-width-container>
      <v-jumbotron
        :gradient="gradient"
        height="100vh"
        src="../assets/material2-bw.jpg"
      >
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center>

              <h2 class="display-2">
                Thanks for visiting!
              </h2>

              <v-divider class="my-3" />

              <div class="title mb-3">
                Privacy
              </div>
              <p>
                No data is being shared.<br>
                Your list of birthdays sits within your browser only.
              </p>

              <v-divider class="my-3" />

              <p>
                Code is open source, check it out!
              </p>
              <a href="https://github.com/cedric25/ages-and-birthdays" target="_blank">
                <v-btn large color="primary" class="mx-0">
                  <img src="../assets/github-icon.svg" class="github-icon">
                  Github
                </v-btn>
              </a>

              <p class="mt-3">
                v{{ appVersion }}
              </p>

            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
    </ab-full-width-container>
  </transition>
</template>

<script>
import FullWidthContainer from '../components/containers/FullWidthContainer.vue'
import { version } from '../../package.json'

export default {
  components: {
    'ab-full-width-container': FullWidthContainer,
  },
  data: () => ({
    appVersion: version,
    gradient: 'to top right, rgba(144,202,249, .7), rgba(144,202,249, .5)'
  })
}
</script>

<style scoped>
  .github-icon {
    width: 20px;
    margin-right: 10px;
  }

  .fade-enter-active {
    transition: all .3s ease;
  }
  .fade-enter {
    transform: translateX(50%);
  }
  .fade-leave {
    opacity: 0;
  }
</style>
