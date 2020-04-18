<template>
  <span class="chip" :class="classes">
    <span :class="circleClasses">
      <slot name="icon" />
    </span>
    <span><slot /></span>
    <button v-if="closable" type="button" class="ml-2" @click="$emit('close')">
      <i class="fa fa-times-circle" />
    </button>
  </span>
</template>

<script>
  export default {
    props: {
      selected: { type: Boolean, default: false },
      clickable: { type: Boolean, default: false },
      closable: { type: Boolean, default: false },
    },
    computed: {
      classes() {
        return [this.selected && 'blue', this.clickable && 'clickable'].join(' ')
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
    @apply outline-none;

    &.clickable {
      @apply cursor-pointer;

      &:hover,
      &:focus {
        @apply bg-gray-600;
      }
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
