<template>
  <div class="person">

    <v-card v-click-outside="cancelEdit">
      <v-card-title :class="{ 'mt-2': !hasGroups }">
        <div>

          <div v-if="hasGroups" class="group-label">
            <v-chip
              v-for="group in person.groups"
              :key="group"
              outline
              color="red"
              :close="isEditMode"
              @input="removeFromGroup(group)"
            >
              {{ group }}
            </v-chip>
          </div>
          <div v-if="isEditMode" class="group-label">
            <v-chip
              v-for="group in otherGroups"
              :key="group"
              color="secondary"
              text-color="white"
              class="blue-chip"
              @click="addToGroup(group)"
            >
              {{ group }}
            </v-chip>
          </div>

          <v-text-field
            v-if="isEditMode"
            ref="name"
            v-model="name"
            name="name"
            placeholder="Name"
            class="name-input pt-0"
            @keyup.enter="updatePerson()"
            @keyup.esc="cancelEdit()"
          />
          <h3
            v-if="!isEditMode"
            class="headline mb-0 text-md-center"
            @dblclick="switchToEditMode()"
          >
            {{ person.name }}
            <span v-if="isBaby" class="baby-icon">👶</span>
          </h3>

          <div class="dob-age-wrap">
            <div class="dob-wrap">
              <v-chip
                v-if="!isEditMode"
                color="green"
                text-color="white"
                disabled
                @dblclick="switchToEditMode('dob')"
              >
                {{ readableBirthday }}
              </v-chip>
              <v-text-field
                v-if="isEditMode"
                ref="dob"
                v-model="dob"
                name="dob"
                placeholder="DD/MM/YYYY"
                class="dob-input pt-0"
                @keyup.enter="updatePerson()"
                @keyup.esc="cancelEdit()"
              />
            </div>
            <div class="age-wrap">
              <v-chip color="accent" text-color="white" disabled>
                <span class="age">{{ person.age }}</span>y old
              </v-chip>
            </div>
          </div>
          <div class="mt-1 text-md-center">
            Will turn {{ person.age + 1 }} in
            <strong>{{ person.daysUntilBirthday }}</strong> day{{ person.daysUntilBirthday > 1 && 's' || '' }}
          </div>

          <v-btn v-if="!isEditMode" icon class="edit-btn" @click="switchToEditMode()">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn v-if="!isEditMode" icon class="delete-btn" @click="deletePerson()">
            <v-icon>delete</v-icon>
          </v-btn>

          <v-btn v-if="isEditMode" icon @click="updatePerson()">
            <v-icon>check</v-icon>
          </v-btn>
          <v-btn v-if="isEditMode" icon class="cancel-btn" @click="cancelEdit()">
            <v-icon>clear</v-icon>
          </v-btn>

        </div>
      </v-card-title>
    </v-card>

  </div>
</template>

<script>
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import { mapGetters } from 'vuex'
// eslint-disable-next-line no-unused-vars
import ClickOutside from '../../directives/click-outside-directive'

export default {
  props: {
    person: Object,
  },
  data() {
    return {
      isEditMode: false,
      name: '',
      dob: '',
    }
  },
  computed: {
    ...mapGetters([
      'groups',
    ]),
    hasGroups() {
      return this.person.groups && this.person.groups.length > 0
    },
    readableBirthday() {
      return format(this.person.birthday, 'D MMM YYYY')
    },
    otherGroups() {
      return this.groups.filter(group => !this.isInGroup(group))
    },
    isBaby() {
      return this.person.age <= 2
    },
  },
  created() {
    this.name = this.person.name
    this.dob = format(this.person.birthday, 'YYYY-MM-DD')
  },
  methods: {
    switchToEditMode(inputToFocusOn = 'name') {
      this.isEditMode = true
      this.$nextTick(() => this.$refs[inputToFocusOn].focus())
    },
    updatePerson() {
      this.isEditMode = false
      this.$store.commit('updatePerson', {
        id: this.person.id,
        name: this.name,
        birthday: parse(this.dob),
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
    isInGroup(group) {
      return this.person.groups && this.person.groups.includes(group)
    },
    addToGroup(group) {
      this.$store.commit('addGroupToPerson', {
        personId: this.person.id,
        groupToAdd: group,
      })
    },
    removeFromGroup(group) {
      this.$store.commit('removeGroupFromPerson', {
        personId: this.person.id,
        groupToRemove: group,
      })
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
      padding: 5px 5px 16px 5px;

      > div {
        flex: 1;
      }

      .group-label {
        text-align: left;
      }

      h3 {
        padding: 0 30px 2px;

        .baby-icon {
          font-size: .75em;
          padding-left: 5px;
        }
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

      .dob-age-wrap {
        display: flex;
        align-items: center;
        padding: 0 30px;
        justify-content: center;

        .dob-wrap,
        .age-wrap {
          flex: 1;
        }
        .dob-wrap {
          text-align: right;
        }
        .age-wrap {
          text-align: left;
        }

        .dob-input {
          max-width: 100px;
          float: right;

          /deep/ input {
            text-align: center;
          }
          /deep/ .input-group__details {
            min-height: 0;
          }
        }
      }

      &:hover .edit-btn,
      &:hover .delete-btn {
        opacity: 1;
      }

      .blue-chip {
        /deep/ span {
          cursor: pointer;
        }

        &.chip--selected {
          box-shadow: none;
          border-color: rgb(25, 118, 210) !important;

          &::after {
            background: rgb(25, 118, 210);
            opacity: 1;
          }
        }
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
