<template>
  <div>
    Order by:

    <button
      type="button"
      v-for="order in orders"
      :key="order.prop"
      class="ml-6 focus:outline-none"
      :class="{ 'text-blue-600': selectedOrder === order.prop }"
      @click="selectOrder(order.prop)"
      @keyup.enter="selectOrder(order.prop)"
    >
      {{ order.label }}
      <i v-if="selectedOrder === order.prop" class="fa fa-chevron-down ml-1" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    selectedOrder: String,
  },
  data: () => ({
    orders: [
      {
        prop: 'daysUntilBirthday',
        label: 'Upcoming birthday',
      },
      {
        prop: 'name',
        label: 'Name',
      },
      {
        prop: 'age',
        label: 'Age',
      },
    ],
  }),
  methods: {
    selectOrder(order) {
      this.$emit('order', order)
    },
  },
}
</script>

<style scoped lang="scss">
button {
  @apply text-sm font-medium tracking-widest uppercase;
}
</style>
