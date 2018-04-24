<template>
  <div>
    <div v-for="person in importantPersons" :key="person.name">
      <div>{{ person.name }}</div>
      <div>{{ person.birthDate }}</div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: mapGetters([
      'importantPersons',
    ]),
  }
</script>
