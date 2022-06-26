<template>
  <Modal
    id="importGoogleContactsModal"
    :show-modal="showModal"
    :hide-modal="hideModal"
    @close="resetImportState"
  >
    <!--Title-->
    <template #title>
      <template v-if="doingImportFromGoogle"> Syncing... </template>
      <template v-else-if="isImportFromGoogleDone"> Import done! </template>
      <template v-else> We'll need your consent </template>
    </template>

    <!--Content-->
    <template #content>
      <div v-if="doingImportFromGoogle || isImportFromGoogleDone">
        <p>
          Looking for contacts with birthdays...
          <i class="fa fa-search ml-1 text-blue-500" />
          <i class="fa fa-birthday-cake ml-3 text-blue-500" />
        </p>

        <p v-if="totalConnections" class="mt-2">
          {{ totalConnections }} contacts.
        </p>

        <p class="mt-6 mb-5 text-center text-xl">
          <span ref="imported-count" class="imported-count mr-3 inline-block">{{
            importantPersonsCount
          }}</span>
          new birthdays!
        </p>
      </div>
    </template>

    <!--Footer-->
    <template #action>
      <button
        v-if="isImportFromGoogleDone"
        type="button"
        class="btn btn-blue ml-2 px-4 py-3"
        @click="hideModal++"
      >
        OK 👍
      </button>
      <button
        v-else
        type="button"
        class="btn btn-blue ml-2 px-4 py-3"
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
import { mapState } from 'pinia'
import { useAppStore } from '@/store/app/app.store.ts'

export default {
  name: 'ImportGoogleContactsModal',
  props: {
    showModal: { type: Number, default: 0 },
  },
  emits: ['confirm'],
  data: () => ({
    hideModal: 0,
  }),
  computed: {
    ...mapState(useAppStore, [
      'importantPersons',
      'doingImportFromGoogle',
      'isImportFromGoogleDone',
      'totalConnections',
    ]),
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
      const appStore = useAppStore()
      setTimeout(() => {
        appStore.setDoingImportFromGoogle(false)
        appStore.setImportFromGoogleDone(false)
      }, 200)
    },
  },
}
</script>
