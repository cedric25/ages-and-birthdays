<template>
  <div class="chip" :class="classes">
    <div v-if="count != null" class="count">
      {{ count }}
    </div>
    <span><slot /></span>
    <button
      v-if="closable"
      type="button"
      class="inline-flex ml-2 text-yellow-400 hover:text-yellow-500"
      style="margin-right: -5px"
      @click="$emit('close')"
    >
      <svg
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
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

<style scoped>
.chip {
  @apply inline-flex items-center justify-center;
  @apply mx-1 px-3 py-1;
  @apply text-white text-sm whitespace-nowrap text-center;
  @apply bg-gray-500;
  @apply rounded-full;
  @apply outline-none;
}

.chip.clickable {
  @apply cursor-pointer;
}
.chip.clickable:hover,
.chip.clickable:focus {
  @apply bg-gray-600;
}

.chip.blue {
  @apply bg-blue-500;
}
.chip.blue:hover,
.chip.blue:focus {
  @apply bg-blue-600;
}

.chip.green {
  @apply bg-green-500;
}

.chip.light-blue {
  @apply bg-blue-400;
}

.chip.outlined.red {
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
</style>
