<template>
  <div class="person">

    <v-card v-click-outside="cancelEdit">
      <v-card-title :class="{ 'mt-2': !hasGroups }">
        <div>

          <div v-if="hasGroups" class="group-label">
            <v-chip
              v-for="group in personGroups"
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
            v-model="newName"
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
            {{ name }}
            <span v-if="isBaby" class="baby-icon">👶</span>
          </h3>

          <div class="dob-age-wrap">
            <div class="dob-wrap" :class="{ 'text-center': !isYearKnown }">
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
                :class="{ 'margin-auto': !isYearKnown }"
                @keyup.enter="updatePerson()"
                @keyup.esc="cancelEdit()"
              />
            </div>
            <div class="age-wrap" v-if="isYearKnown">
              <v-chip color="accent" text-color="white" disabled>
                <span class="age">{{ ageValue.value }}</span><span v-html="ageValue.unit"></span>&nbsp;old
              </v-chip>
            </div>
          </div>
          <div class="birthday-in-wrap mt-1 text-md-center">
            <span>
              {{ textBeforeDays }}
            </span>
            <span v-if="!isBirthdayToday">
              <strong>{{ daysUntilBirthday }}</strong> day{{ daysUntilBirthday > 1 && 's' || '' }}
            </span>
            <span class="cake-icon" v-if="isBirthdayToday">
              🎂
            </span>
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
import * as importantPersons from '../../helpers/importantPersons'
import { containsYear } from '../../helpers/date'

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    age: {
      type: Object,
      required: true,
    },
    daysUntilBirthday: {
      type: Number,
      required: true,
    },
    personGroups: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      isEditMode: false,
      newName: '',
      dob: '',
    }
  },
  computed: {
    ...mapGetters([
      'groups',
    ]),
    hasGroups() {
      return this.personGroups && this.personGroups.length > 0
    },
    readableBirthday() {
      if (!this.isYearKnown) {
        return format(this.birthday, 'd MMM')
      }
      return format(this.birthday, 'd MMM YYYY')
    },
    otherGroups() {
      return this.groups.filter(group => !this.isInGroup(group))
    },
    isBaby() {
      return this.isYearKnown &&
        (this.age.unit === 'months' || this.age.value < 3)
    },
    ageValue() {
      let unit = 'y'
      if (this.age.unit === 'months') {
        unit = '&nbsp;months'
      }
      return {
        value: this.age.value,
        unit,
      }
    },
    nextAge() {
      if (this.age.unit === 'months') {
        return 1
      }
      return this.age.value + 1
    },
    isYearKnown() {
      return this.birthday.getFullYear() !== 1900
    },
    isBirthdayToday() {
      return this.daysUntilBirthday === 0
    },
    textBeforeDays() {
      if (this.isBirthdayToday) {
        if (this.isYearKnown) {
          return `Turning ${this.nextAge} today!`
        }
        return 'Birthday today!'
      }
      if (this.isYearKnown) {
        return `Will turn ${this.nextAge} in`
      }
      return `Birthday in`
    },
  },
  created() {
    this.newName = this.name
    if (this.isYearKnown) {
      this.dob = format(this.birthday, 'dd/MM/YYYY')
    } else {
      this.dob = format(this.birthday, 'dd/MM')
    }
  },
  methods: {
    switchToEditMode(inputToFocusOn = 'name') {
      this.isEditMode = true
      this.$nextTick(() => this.$refs[inputToFocusOn].focus())
    },
    updatePerson() {
      this.isEditMode = false
      let dateFormat = 'dd/MM/yyyy'
      if (!containsYear(this.dob)) {
        dateFormat = 'dd/MM'
      }
      importantPersons.updatePerson(this.$store, {
        id: this.id,
        name: this.newName,
        birthday: parse(this.dob, dateFormat, new Date(1900, 0, 1)),
      })
    },
    deletePerson() {
      importantPersons.deletePerson(this.$store, this.id)
    },
    cancelEdit() {
      this.isEditMode = false
      this.newName = this.name
    },
    isInGroup(group) {
      return this.personGroups && this.personGroups.includes(group)
    },
    addToGroup(group) {
      importantPersons.addGroupToPerson(this.$store, this.id, group)
    },
    removeFromGroup(group) {
      importantPersons.removeGroupFromPerson(this.$store, this.id, group)
    },
  },
}
</script>

<style scoped lang="scss">
  .person {
    width: 300px;
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
        padding-right: 30px;
      }

      h3 {
        padding: 0 30px 2px;

        .baby-icon {
          font-size: .75em;
          padding-left: 5px;
          display: inline-block;
          margin-bottom: -3px;
        }
      }

      .name-input {
        margin-top: 3px;
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

          &.text-center {
            text-align: center;
          }
        }
        .age-wrap {
          text-align: left;
        }

        .dob-input {
          margin-top: 3px;
          margin-bottom: 3px;
          max-width: 100px;
          float: right;

          &.margin-auto {
            float: none;
            margin-left: auto;
            margin-right: auto;
          }

          /deep/ input {
            text-align: center;
          }
          /deep/ .input-group__details {
            min-height: 0;
          }
        }
      }

      .birthday-in-wrap {
        position: relative;

        .cake-icon {
          font-size: 1.5em;
          position: absolute;
          top: -5px;
          margin-left: 5px;
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

  @media (max-width: 399px) {
    .person {
      width: 300px;
    }
  }

  @media (min-width: 400px) and (max-width: 664px) {
    .person {
      width: 350px;
    }
  }

  @media (min-width: 665px) and (max-width: 762px) {
    .person {
      width: 300px;
    }
  }

  @media (min-width: 763px) and (max-width: 1064px) {
    .person {
      width: 350px;
    }
  }

  @media (min-width: 1065px) and (max-width: 1263px) {
    .person {
      width: 300px;
    }
  }

  @media (min-width: 1264px) {
    .person {
      width: 350px;
    }
  }
</style>
