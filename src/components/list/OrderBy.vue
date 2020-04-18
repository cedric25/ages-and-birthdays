<template>
  <div class="order-by-wrap">
    Order by:

    <button
      type="button"
      v-for="order in orders"
      :key="order.prop"
      :color="selectedOrder === order.prop ? 'primary' : ''"
      :class="'btn-sort-' + order.prop"
      @click="selectOrder(order.prop)"
      @keyup.enter="selectOrder(order.prop)"
    >
      {{ order.label }}
      <i class="fa fa-chevron-down" v-if="selectedOrder === order.prop" />
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
  .order-by-wrap {
    text-align: left;

    @media (max-width: 699px) {
      button {
        display: block;
        min-width: 0;
        margin-left: 0;
      }
    }

    @media (min-width: 700px) {
      button {
        display: inline;
      }

      .btn-sort-daysUntilBirthday {
        min-width: 190px;
      }
    }
  }
</style>
