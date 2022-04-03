<template>
  <transition name="slide">
    <div class="background-image">
      <div class="mx-auto flex h-full max-w-4xl flex-col justify-center">
        <h2 class="text-5xl">Thanks for visiting!</h2>

        <hr class="my-4 border-gray-500" />

        <div class="mb-3 text-xl font-bold">Privacy</div>
        <p>
          No data is being shared.<br />
          Your list of birthdays sits within your browser only, or in Firebase
          if you log in.
        </p>

        <hr class="my-4 border-gray-500" />

        <p>Code is open source, check it out!</p>
        <a
          href="https://github.com/cedric25/ages-and-birthdays"
          target="_blank"
        >
          <button class="btn btn-blue mx-auto mt-2 flex">
            <img src="../assets/github-icon.svg" class="github-icon" />
            Github
          </button>
        </a>

        <p class="mt-3">v{{ appVersion }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
import { version } from '../../package.json'

export default {
  data: () => ({
    appVersion: version,
    gradient: 'to top right, rgba(144,202,249, .7), rgba(144,202,249, .5)',
  }),
}
</script>

<style scoped>
.background-image {
  height: 94vh;
  background-image: url('../assets/material2-bw.jpg');
  text-align: center;
}

.github-icon {
  width: 20px;
  margin-right: 10px;
}

.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-enter {
  transform: translateX(50%);
}
.slide-leave {
  opacity: 0;
}
</style>
