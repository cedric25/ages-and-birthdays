<template>
  <Modal
    id="importGoogleContactsModal"
    :show-modal="showModal"
    :hide-modal="hideModal"
    @close="resetImportState"
  >
    <!--Title-->
    <template v-slot:title>
      <template v-if="doingImportFromGoogle">
        Syncing...
      </template>
      <template v-else-if="isImportFromGoogleDone">
        Import done!
      </template>
      <template v-else>
        We'll need your consent
      </template>
    </template>

    <!--Content-->
    <template v-slot:content>
      <div v-if="doingImportFromGoogle || isImportFromGoogleDone">
        <p>
          Looking for contacts with birthdays...
          <i class="fa fa-search ml-1 text-blue-500" />
          <i class="fa fa-birthday-cake ml-3 text-blue-500" />
        </p>

        <p v-if="totalConnections" class="mt-2">{{ totalConnections }} contacts.</p>

        <p class="text-center mt-6 mb-5 text-xl">
          <span ref="imported-count" class="imported-count inline-block mr-3">{{
            importantPersonsCount
          }}</span>
          new birthdays!
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
        Yes, let's do it!
      </button>
    </template>
  </Modal>
</template>

<script>
  import anime from 'animejs'
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
        totalConnections: state => state.app.totalConnections,
      }),
      importantPersonsCount() {
        return this.importantPersons.length
      },
    },
    watch: {
      importantPersonsCount: {
        handler() {
          if (this.$refs['imported-count']) {
            this.$refs['imported-count'].style.transform = 'none'
            anime({
              targets: '.imported-count',
              scale: 1.5,
              duration: 500,
              easing: 'easeOutBack',
            })
          }
        },
      },
    },
    methods: {
      resetImportState() {
        setTimeout(() => {
          this.$store.commit('setDoingImportFromGoogle', false)
          this.$store.commit('setImportFromGoogleDone', false)
        }, 200)
      },
    },
  }
</script>
