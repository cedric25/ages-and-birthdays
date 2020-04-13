<template>
  <v-chip
    :color="selected ? 'primary' : 'secondary'"
    text-color="white"
    tabindex="0"
    class="mr-2 mb-2"
    @click="$emit('select', monthIndex)"
    @keyup.enter="$emit('select', monthIndex)"
    @keyup.space="$emit('select', monthIndex)"
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
