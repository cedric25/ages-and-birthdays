<template>
  <div>
    <button
      v-if="importantPersons.length > 0"
      type="button"
      @click="downloadJson"
      class="mr-4"
    >
      Download JSON
    </button>

    <label
      class="v-btn v-btn--contained theme--light v-size--default"
      style="cursor: pointer"
    >
      <input type="file" @change="onFileChange" />
      <span class="btn__content"> Upload JSON </span>
    </label>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useAppStore } from '@/store/app/app.store.ts'
import { findGroups } from '@/helpers/findGroups.js'
import * as importantPersons from '@/helpers/importantPersons.ts'
import * as groups from '@/helpers/groups.ts'

export default {
  computed: {
    ...mapState(useAppStore, ['importantPersons']),
  },
  methods: {
    downloadJson() {
      const tempDownloadButton = document.createElement('a')
      const personsStr = JSON.stringify(this.importantPersons, null, 2)
      const encodedPersons = encodeURIComponent(personsStr)
      tempDownloadButton.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodedPersons
      )
      tempDownloadButton.setAttribute('download', 'ages-and-birthdays.json')

      tempDownloadButton.style.display = 'none'
      document.body.appendChild(tempDownloadButton)

      tempDownloadButton.click()

      document.body.removeChild(tempDownloadButton)
    },
    onFileChange($event) {
      const files = $event.target.files || $event.dataTransfer.files
      this.handleFile(files[0])
    },
    handleFile(file) {
      const reader = new FileReader()

      reader.onload = () => {
        try {
          const jsonPersons = JSON.parse(reader.result)
          importantPersons.setAllDbPersons(jsonPersons)
          const allGroups = findGroups(jsonPersons)
          groups.setAllGroups(allGroups)
        } catch (err) {
          console.error('Invalid JSON file...')
        }
      }

      reader.readAsText(file)
    },
  },
}
</script>

<style scoped>
input[type='file'] {
  display: none;
}
</style>
