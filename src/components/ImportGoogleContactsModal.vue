<template>
  <Modal :show-modal="showModal" :hide-modal="hideModal" @close="resetImportState">
    <!--Title-->
    <template v-slot:title>
      <template v-if="doingImportFromGoogle">
        Syncing...
      </template>
      <template v-if="isImportFromGoogleDone">
        Import done!
      </template>
      <template>
        We'll need your consent!
      </template>
    </template>

    <!--Content-->
    <template v-slot:content>
      <div v-if="doingImportFromGoogle || isImportFromGoogleDone">
        <p>
          Looking for friends, family, colleagues... with birthdays
          <i class="fa fa-search" />
          <i class="fa fa-birthday-cake" />
        </p>

        <p>
          <strong>{{ importantPersons.length }}</strong> new birthdays!
        </p>
      </div>
    </template>

    <!--Footer-->
    <template v-slot:action>
      <button
        v-if="isImportFromGoogleDone"
        type="button"
        class="btn btn-blue px-4 py-3 ml-2"
        @click="hideModal++"
      >
        OK 👍
      </button>
      <button
        v-else
        type="button"
        class="btn btn-blue px-4 py-3 ml-2"
        :disabled="doingImportFromGoogle"
        @click="$emit('confirm')"
      >
        Yes, I agree!
      </button>
    </template>
  </Modal>
</template>

<script>
  import { mapState } from 'vuex'
  import Modal from './kit/Modal'

  export default {
    name: 'ImportGoogleContactsModal',
    components: {
      Modal,
    },
    props: {
      showModal: { type: Number, default: 0 },
    },
    data: () => ({
      hideModal: 0,
    }),
    computed: {
      ...mapState({
        importantPersons: state => state.app.importantPersons,
        doingImportFromGoogle: state => state.app.doingImportFromGoogle,
        isImportFromGoogleDone: state => state.app.isImportFromGoogleDone,
      }),
    },
    methods: {
      resetImportState() {
        this.$store.commit('setDoingImportFromGoogle', false)
        this.$store.commit('setImportFromGoogleDone', false)
      },
    },
  }
</script>
