<template>
  <form>
    <input type="text" placeholder="Name" v-model="name" />
    <input type="text" placeholder="Date of birth" v-model="birthDate" />
    <button type="submit" @click.prevent="addBirthDate()">
      Add
    </button>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        birthDate: '',
      }
    },
    methods: {
      addBirthDate() {
        this.$store.commit('addNewImportantPerson', {
          name: this.name,
          birthDate: this.birthDate,
        })
        this.name = ''
        this.birthDate = ''
      }
    }
  }
</script>
