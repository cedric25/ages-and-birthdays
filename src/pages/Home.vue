<template>
  <transition name="fade">
    <ab-fixed-width class="pa-4">

      <h2 class="subtitle">
        Can't remember ages and birthdays? Me neither...
      </h2>

      <add-birth-date/>

      <hr>

      <important-persons/>

    </ab-fixed-width>
  </transition>
</template>

<script>
import AbFixedWidth from '../components/containers/ab-fixed-width'
import AddBirthDate from '../components/add/AddBirthDate.vue'
import ImportantPersons from '../components/list/ImportantPersons.vue'

export default {
  components: {
    AbFixedWidth,
    AddBirthDate,
    ImportantPersons,
  },
}
</script>

<style scoped>
  .subtitle {
    font-weight: 300;
    font-size: 32px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  hr {
    margin: 20px 0;
  }

  .fade-enter-active {
    transition: transform .3s ease;
  }
  .fade-enter {
    transform: translateX(-50%);
  }
  .fade-leave {
    opacity: 0;
  }
</style>
