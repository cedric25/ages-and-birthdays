<template>

  <div class="add-group-form-wrap">
    <div class="add-group-form">
      <v-text-field
        name="group"
        placeholder="Add new..."
        v-model="newGroupName"
        class="pt-0"
        @keyup.enter="addGroup()"
      ></v-text-field>
      <v-btn color="accent" @click.prevent="addGroup()" :disabled="!newGroupName">
        Add group
      </v-btn>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        newGroupName: '',
      }
    },
    computed: {
      ...mapGetters([
        'groups',
      ]),
    },
    methods: {
      addGroup() {
        if (this.groups.indexOf(this.newGroupName) === -1) {
          this.$store.commit('addGroup', this.newGroupName)
          this.newGroupName = ''
        }
      },
    },
  }
</script>

<style scoped>
  .add-group-form-wrap {
    max-width: 300px;
  }

  .add-group-form {
    display: flex;
    align-items: baseline;
  }
</style>
