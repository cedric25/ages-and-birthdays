<template>
  <Modal :show-modal="showModal" :hide-modal="hideModal">
    <!--Title-->
    <template v-slot:title>
      Remove birthday of <strong>{{ personName }}</strong
      >?
    </template>

    <!--Body-->
    <!--<template v-slot:content>Modal content can go here</template>-->

    <!--Footer-->
    <template v-slot:action>
      <button type="button" class="btn btn-blue px-4 py-3 ml-2" @click="yes">
        Yes, do it!
      </button>
    </template>
  </Modal>
</template>

<script>
export default {
  name: 'ConfirmDeleteModal',
  props: {
    personId: { type: String, required: true },
    personName: { type: String, required: true },
    showModal: { type: Number, required: true },
  },
  data: () => ({
    hideModal: 0,
  }),
  methods: {
    yes() {
      this.$emit('confirm', this.personId)
      this.hideModal++
    },
  },
}
</script>
