<template>
  <div class="person">

    <v-card v-click-outside="cancelEdit">
      <v-card-title>
        <div>

          <v-text-field
            v-if="isEditMode"
            name="name"
            ref="name"
            placeholder="Name"
            v-model="name"
            class="name-input pt-0"
            @keyup.enter="updatePerson()"
            @keyup.esc="cancelEdit()"
          ></v-text-field>
          <h3 v-if="!isEditMode" class="headline mb-0" @mouseup="switchToEditMode()">
            {{ person.name }}
          </h3>

          <div>
            <v-chip color="green" text-color="white">
              {{ person.birthDate }}
            </v-chip>
            <v-chip color="accent" text-color="white">
              <span class="age">{{ person.age }}</span>y old
            </v-chip>
          </div>
          <div>
            Will turn {{ person.age + 1 }} in
            <strong>{{ person.daysUntilBirthday }}</strong> day{{ person.daysUntilBirthday > 1 && 's' || '' }}
          </div>

          <v-btn icon v-if="!isEditMode" @click="switchToEditMode()" class="edit-btn">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn icon v-if="!isEditMode" @click="deletePerson()" class="delete-btn">
            <v-icon>delete</v-icon>
          </v-btn>

          <v-btn icon v-if="isEditMode" @click="updatePerson()">
            <v-icon>check</v-icon>
          </v-btn>
          <v-btn icon v-if="isEditMode" @click="cancelEdit()" class="cancel-btn">
            <v-icon>clear</v-icon>
          </v-btn>

        </div>
      </v-card-title>
    </v-card>

  </div>
</template>

<script>
  export default {
    props: {
      person: Object,
    },
    data() {
      return {
        isEditMode: false,
        name: '',
      }
    },
    created() {
      this.name = this.person.name
    },
    methods: {
      switchToEditMode() {
        this.isEditMode = true
        this.$nextTick(() => this.$refs.name.focus())
      },
      updatePerson() {
        this.isEditMode = false
        this.$store.commit('updatePerson', {
          id: this.person.id,
          name: this.name,
        })
      },
      deletePerson() {
        this.$store.commit('deletePerson', {
          id: this.person.id,
        })
      },
      cancelEdit() {
        this.isEditMode = false
        this.name = this.person.name
      },
    },
  }
</script>

<style scoped lang="scss">
  .person {
    width: 350px;
    display: flex;
    flex-direction: column;
    margin: 15px 0;

    .card__title {
      display: flex;

      > div {
        flex: 1;
      }

      h3 {
        padding: 0 30px 2px;
      }

      .name-input {
        padding: 0 30px;

        /deep/ input {
          text-align: center;
          font-size: 24px;
        }
        /deep/ .input-group__details {
          min-height: 0;
        }
      }

      &:hover .edit-btn,
      &:hover .delete-btn {
        opacity: 1;
      }
    }

    .age {
      font-weight: bold;
      font-size: 1.1em;
    }

    .btn {
      position: absolute;
      top: 0;
      right: 0;
      color: rgba(0, 0, 0, 0.6);
      margin: 4px;
      transition: opacity ease-in-out 200ms;
    }
    .delete-btn,
    .cancel-btn {
      top: 35px;
    }
    .edit-btn,
    .delete-btn {
      opacity: 0;
    }
  }
</style>
