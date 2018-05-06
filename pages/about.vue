<template>
  <v-jumbotron
    height="100vh"
    :gradient="gradient"
    src="/material2-bw.jpg"
  >
    <v-container fill-height>
      <v-layout align-center>
        <v-flex text-xs-center>

          <h3 class="display-3">
            Thanks for visiting!
          </h3>

          <v-divider class="my-3"></v-divider>

          <div class="title mb-3">
            Privacy
          </div>
          <p>
            No data is being shared.<br>
            Your list of birthdays sits within your browser only.
          </p>

          <v-divider class="my-3"></v-divider>

          <p>
            Source code is open source, check it out!
          </p>
          <a href="https://github.com/cedric25/ages-and-birthdays" target="_blank">
            <v-btn large color="primary" class="mx-0">
              <img src="/github-icon.svg" class="github-icon" />
              Github
            </v-btn>
          </a>

        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
  export default {
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
</style>
