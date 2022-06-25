<template>
  <div class="mb-8">
    <AddBirthDatePanel />

    <div class="font-xl mt-3 text-center">OR</div>

    <button
      type="button"
      class="btn-import"
      :class="shouldMinimizeGoogleImport ? '' : 'mt-3 scale-100'"
      @click="showImportGoogleContactsModal++"
    >
      <span class="svg-wrap">
        <img src="../assets/google-icon.svg" style="max-height: 100%" />
      </span>
      <span class="svg-wrap">
        <img src="../assets/android-icon.svg" style="max-height: 100%" />
      </span>
      <span> Import your contacts </span>
    </button>

    <ImportGoogleContactsModal
      :show-modal="showImportGoogleContactsModal"
      @confirm="askForConsent"
    />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { askForConsent } from '@/helpers/googlePeopleSync'
import { useAppStore } from '@/store/app/app.store.js'

export default {
  name: 'AddPersonChoices',
  data: () => ({
    showImportGoogleContactsModal: 0,
  }),
  computed: {
    ...mapState(useAppStore, ['importantPersons']),
    shouldMinimizeGoogleImport() {
      return this.importantPersons?.length > 0
    },
  },
  methods: {
    askForConsent() {
      askForConsent()
    },
  },
}
</script>

<style scoped lang="scss">
.btn-import {
  @apply mx-auto py-2 pl-3 pr-5;
  @apply rounded-full bg-blue-500 text-white;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  @apply flex items-center;
  @apply text-lg;
  @apply outline-none;
  @apply transition duration-200 ease-in-out;
  @apply mt-0 scale-75 transform;

  &:hover {
    @apply bg-blue-600;
  }

  $icon-size: 38px;

  .svg-wrap {
    @apply block rounded-full bg-white;
    @apply mr-3 p-1;
    width: $icon-size;
    height: $icon-size;
    box-shadow: 0 0 2px 0 #fff;
  }
}
</style>
