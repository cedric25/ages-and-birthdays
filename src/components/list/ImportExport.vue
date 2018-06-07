<template>
  <div>

    <v-btn
      v-if="importantPersons.length > 0"
      @click="downloadJson()"
    >
      Download JSON
    </v-btn>

    <label class="btn">
      <input type="file" @change="onFileChange">
      <span class="btn__content">
        Upload JSON
      </span>
    </label>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { findGroups } from '../../helpers/findGroups'

export default {
  computed: {
    ...mapGetters([
      'importantPersons',
    ]),
  },
  methods: {
    downloadJson() {
      const tempDownloadButton = document.createElement('a')
      const personsStr = JSON.stringify(this.importantPersons, null, 2)
      const encodedPersons = encodeURIComponent(personsStr)
      tempDownloadButton.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodedPersons)
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
          this.$store.commit('setAllPersons', jsonPersons)
          const groups = findGroups(jsonPersons)
          this.$store.commit('setAllGroups', groups)
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
  input[type="file"] {
    display: none;
  }

  .btn {
    cursor: pointer;
  }
</style>
