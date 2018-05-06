<template>
  <div>
    <v-chip
      v-for="group in groups" :key="group"
      color="secondary"
      text-color="white"
      class="blue-chip"
      close
      @input="deleteGroup(group)"
    >
      {{ group }}
    </v-chip>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'groups',
      ]),
    },
    methods: {
      deleteGroup (group) {
        this.$store.commit('deleteGroup', group)
      },
    }
  }
</script>
