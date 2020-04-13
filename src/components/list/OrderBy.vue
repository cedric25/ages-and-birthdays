<template>
  <div class="order-by-wrap">
    Order by:

    <v-btn
      v-for="order in orders"
      :key="order.prop"
      flat
      small
      :color="selectedOrder === order.prop ? 'primary' : ''"
      :class="'btn-sort-' + order.prop"
      @click="selectOrder(order.prop)"
      @keyup.enter="selectOrder(order.prop)"
    >
      {{ order.label }}
      <v-icon dark right color="primary darken-2" class="ml-0" v-if="selectedOrder === order.prop"
        >keyboard_arrow_down</v-icon
      >
    </v-btn>
  </div>
</template>

<script>
  export default {
    props: {
      selectedOrder: String,
    },
    data() {
      return {
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
      }
    },
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
