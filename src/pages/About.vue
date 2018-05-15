<template>
  <transition name="fade">
    <ab-full-width>
      <v-jumbotron
        :gradient="gradient"
        height="100vh"
        src="../../public/material2-bw.jpg"
      >
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center>

              <h3 class="display-3">
                Thanks for visiting!
              </h3>

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
                Source code is open source, check it out!
              </p>
              <a href="https://github.com/cedric25/ages-and-birthdays" target="_blank">
                <v-btn large color="primary" class="mx-0">
                  <img src="../../public/github-icon.svg" class="github-icon">
                  Github
                </v-btn>
              </a>

            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
    </ab-full-width>
  </transition>
</template>

<script>
import AbFullWidth from '../components/containers/ab-full-width'

export default {
  components: {
    AbFullWidth,
  },
  data: () => ({
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
