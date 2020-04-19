<template>
  <div class="chip" :class="classes">
    <div v-if="count != null" class="count">
      {{ count }}
    </div>
    <span><slot /></span>
    <button
      v-if="closable"
      type="button"
      class="inline-flex ml-2 hover:text-gray-300"
      style="margin-right: -5px;"
      @click="$emit('close')"
    >
      <i class="fa fa-times-circle text-base" />
    </button>
  </div>
</template>

<script>
  export default {
    props: {
      selected: { type: Boolean, default: false },
      clickable: { type: Boolean, default: false },
      closable: { type: Boolean, default: false },
      count: { type: Number, default: null },
      green: { type: Boolean, default: false },
      outlined: { type: Boolean, default: false },
      red: { type: Boolean, default: false },
      lightBlue: { type: Boolean, default: false },
    },
    computed: {
      classes() {
        return [
          this.selected && 'blue',
          this.green && 'green',
          this.lightBlue && 'light-blue',
          this.clickable && 'clickable',
          this.outlined && 'outlined',
          this.red && 'red',
        ]
          .filter(value => !!value)
          .join(' ')
      },
    },
  }
</script>

<style scoped lang="scss">
  .chip {
    @apply inline-flex items-center justify-center;
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

    &.green {
      @apply bg-green-500;
    }

    &.light-blue {
      @apply bg-blue-400;
    }

    &.outlined.red {
      @apply bg-white text-red-600;
      @apply border border-solid border-red-600;
    }

    .count {
      @apply inline-flex items-center justify-center;
      @apply bg-gray-700 rounded-full;
      @apply mr-2;
      width: 24px;
      height: 24px;
      margin-left: -7px;
    }
  }
</style>
