<template>
  <div class="mb-8">
    <AddBirthDatePanel />

    <div class="text-center font-xl my-3">
      OR
    </div>

    <button type="button" class="btn-import" @click="showImportGoogleContactsModal++">
      <span class="svg-wrap">
        <img src="../assets/google-icon.svg" style="max-height: 100%;" />
      </span>
      <span class="svg-wrap">
        <img src="../assets/android-icon.svg" style="max-height: 100%;" />
      </span>
      <span>
        Import your contacts
      </span>
    </button>

    <ImportGoogleContactsModal
      :show-modal="showImportGoogleContactsModal"
      @confirm="askForConsent"
    />
  </div>
</template>

<script>
  import AddBirthDatePanel from './addBirthDate/AddBirthDatePanel'
  import ImportGoogleContactsModal from './ImportGoogleContactsModal'
  import { askForConsent } from '../helpers/googlePeopleSync'

  export default {
    name: 'AddPersonChoices',
    components: {
      AddBirthDatePanel,
      ImportGoogleContactsModal,
    },
    data: () => ({
      showImportGoogleContactsModal: 0,
    }),
    methods: {
      askForConsent() {
        askForConsent()
      },
    },
  }
</script>

<style scoped lang="scss">
  .btn-import {
    @apply pl-3 pr-5 py-2 mx-auto;
    @apply text-white bg-blue-500 rounded-full;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 1px 5px 0 rgba(0, 0, 0, 0.12);
    @apply flex items-center;
    @apply text-lg;
    @apply outline-none;
    @apply transition duration-200 ease-in-out;

    &:hover {
      @apply bg-blue-600;
    }

    $icon-size: 38px;

    .svg-wrap {
      @apply block bg-white rounded-full;
      @apply mr-3 p-1;
      width: $icon-size;
      height: $icon-size;
      box-shadow: 0 0 2px 0 #fff;
    }
  }
</style>
