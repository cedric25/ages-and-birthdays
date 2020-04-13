<template>
  <v-dialog v-model="confirmClearDialog" width="400" @keydown.esc="confirmClearDialog = false">
    <template v-slot:activator="{ on }">
      <v-btn color="error" dark v-on="on">
        Clear list?
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Please confirm...
      </v-card-title>
      <v-card-text class="mt-4">
        This will delete all persons...
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary" text @click="confirmClearDialog = false">
          No
        </v-btn>
        <v-btn color="primary" text @click="clearList">
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import * as importantPersons from '../../helpers/importantPersons'

  export default {
    name: 'ClearList',
    data: () => ({
      confirmClearDialog: false,
    }),
    methods: {
      clearList() {
        importantPersons.removeAllPersons(this.$store)
        this.confirmClearDialog = false
      },
    },
  }
</script>

<style scoped></style>
