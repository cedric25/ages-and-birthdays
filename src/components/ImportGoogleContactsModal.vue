<template>
  <Modal :show-modal="showModal">
    <!--Title-->
    <template v-slot:title>
      We'll need your consent!
    </template>

    <!--Body-->
    <!--<template v-slot:content>Modal content can go here</template>-->

    <!--Footer-->
    <template v-slot:action>
      <button type="button" class="btn btn-blue px-4 py-3 ml-2" @click="$emit('confirm')">
        Yes, I agree!
      </button>
    </template>
  </Modal>
</template>

<script>
  import Modal from './kit/Modal'

  export default {
    name: 'ImportGoogleContactsModal',
    components: {
      Modal,
    },
    props: {
      showModal: { type: Number, default: 0 },
    },
  }
</script>

<style scoped></style>
