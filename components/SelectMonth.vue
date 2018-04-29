<template>
  <v-chip
    color="secondary"
    text-color="white"
    :selected="selected"
    @click="$emit('select', monthIndex)"
    @keyup.enter="$emit('select', monthIndex)"
  >
    {{ monthLabel }}
  </v-chip>
</template>

<script>
  export default {
    props: {
      monthIndex: Number,
      monthLabel: String,
      selected: Boolean,
    },
  }
</script>
