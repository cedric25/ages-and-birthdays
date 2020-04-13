<template>
  <v-chip
    :selected="selected"
    color="secondary"
    text-color="white"
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
