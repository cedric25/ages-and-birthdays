<template>
  <div>
    <v-btn v-if="importantPersons.length > 0" @click="downloadJson()">
      Download JSON
    </v-btn>

    <label class="btn">
      <input type="file" @change="onFileChange" />
      <span class="btn__content">
        Upload JSON
      </span>
    </label>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { findGroups } from '../../helpers/findGroups'
  import * as importantPersons from '../../helpers/importantPersons'
  import * as groups from '../../helpers/groups'

  export default {
    computed: {
      ...mapGetters(['importantPersons']),
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
            importantPersons.setAllPersons(this.$store, jsonPersons)
            const allGroups = findGroups(jsonPersons)
            groups.setAllGroups(this.$store, allGroups)
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

  .btn {
    cursor: pointer;
  }
</style>
