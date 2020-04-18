<template>
  <span class="chip" :class="classes">
    <span :class="circleClasses">
      <slot name="icon" />
    </span>
    <span><slot /></span>
    <button v-if="closable" class="mr-1" @click="$emit('onClose')" />
  </span>
</template>

<script>
  export default {
    props: {
      selected: { type: Boolean, default: false },
      closable: { type: Boolean, default: false },
    },
    computed: {
      classes() {
        return this.selected && 'blue'
      },
      circleClasses() {
        const { color } = this
        return [`bg-${color}-300 w-8 h-full rounded-full`]
      },
    },
  }
</script>

<style scoped lang="scss">
  .chip {
    @apply mx-1 px-3 py-1;
    @apply text-white text-sm whitespace-no-wrap text-center;
    @apply bg-gray-500;
    @apply rounded-full;
    @apply cursor-pointer;
    @apply outline-none;

    &:hover,
    &:focus {
      @apply bg-gray-600;
    }

    &.blue {
      @apply bg-blue-500;

      &:hover,
      &:focus {
        @apply bg-blue-600;
      }
    }
  }
</style>
