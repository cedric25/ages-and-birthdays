<template>
  <div class="person">
    <v-card class="pb-4">
      <div v-if="hasGroups" class="mt-2 ml-2 text-left">
        <v-chip
          v-for="group in personGroups"
          :key="group"
          outlined
          color="red"
          class="mr-2"
          :close="isEditMode"
          @click:close="removeFromGroup(group)"
        >
          {{ group }}
        </v-chip>
      </div>

      <div v-if="isEditMode" class="mt-2 ml-2 pr-10 text-left">
        <v-chip
          v-for="group in otherGroups"
          :key="group"
          color="secondary"
          text-color="white"
          class="mr-2 mt-2"
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
        class="mt-1 px-10 pb-1 centered-input big-font-input"
        hide-details
        @keyup.enter="updatePerson"
        @keyup.esc="cancelEdit"
      />
      <h3 v-if="!isEditMode" class="headline mb-0 text-md-center" @dblclick="switchToEditMode">
        {{ name }}
        <span v-if="isBaby" class="baby-icon">👶</span>
      </h3>

      <div class="d-flex justify-center mt-2 mb-2">
        <div class="text-right" :class="{ 'text-center': !isYearKnown }" style="flex: 1;">
          <v-text-field
            v-if="isEditMode"
            ref="dob"
            v-model="dob"
            name="dob"
            placeholder="DD/MM/YYYY"
            class="ma-auto px-10 pt-0 centered-input small-width-input"
            prepend-inner-icon="fa-calendar"
            :error="wrongDateEntered"
            @keyup.enter="updatePerson()"
            @keyup.esc="cancelEdit()"
          />
          <v-chip
            v-if="!isEditMode"
            color="green"
            text-color="white"
            class="mr-1"
            @dblclick="$event => switchToEditMode($event, 'dob')"
          >
            {{ readableBirthday }}
          </v-chip>
        </div>
        <div class="text-left" v-if="!isEditMode && isYearKnown" style="flex: 1;">
          <v-chip color="accent" text-color="white" class="ml-1">
            {{ ageValue.value }}{{ ageValue.unit }}&nbsp;old
          </v-chip>
        </div>
      </div>

      <div class="birthday-in-wrap mt-1 text-center">
        <span>
          {{ textBeforeDays }}
        </span>
        <span v-if="!isBirthdayToday">
          <strong>{{ daysUntilBirthday }}</strong> day{{ (daysUntilBirthday > 1 && 's') || '' }}
        </span>
        <span v-else class="cake-icon">
          🎂
        </span>
      </div>

      <v-btn v-if="!isEditMode" icon class="edit-btn" @click="switchToEditMode">
        <v-icon small>fa-edit</v-icon>
      </v-btn>
      <v-btn v-if="!isEditMode" icon class="delete-btn" @click="deletePerson">
        <v-icon small>fa-trash</v-icon>
      </v-btn>

      <v-btn v-if="isEditMode" icon class="submit-btn" @click="updatePerson">
        <v-icon small>fa-check</v-icon>
      </v-btn>
      <v-btn v-if="isEditMode" icon class="cancel-btn" @click="cancelEdit">
        <v-icon small>fa-undo</v-icon>
      </v-btn>
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
      id: { type: String, required: true },
      name: { type: String, required: true },
      birthday: { type: Date, required: true },
      age: { type: Object, required: true },
      daysUntilBirthday: { type: Number, required: true },
      personGroups: { type: Array, required: false },
    },
    data: () => ({
      isEditMode: false,
      newName: '',
      dob: '',
      wrongDateEntered: false,
    }),
    computed: {
      ...mapGetters(['groups']),
      hasGroups() {
        return this.personGroups && this.personGroups.length > 0
      },
      readableBirthday() {
        if (!this.isYearKnown) {
          return `${this.birthday.getDate()} ${format(this.birthday, 'MMM')}`
        }
        return format(this.birthday, 'd MMM yyyy')
      },
      otherGroups() {
        return this.groups.filter(group => !this.isInGroup(group))
      },
      isBaby() {
        return this.isYearKnown && (this.age.unit === 'months' || this.age.value < 3)
      },
      ageValue() {
        let unit = 'y'
        if (this.age.unit === 'months') {
          unit = ' months'
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
        return this.birthday.getFullYear() > 1910
      },
      isBirthdayToday() {
        return this.daysUntilBirthday === 0
      },
      textBeforeDays() {
        if (this.isBirthdayToday) {
          if (this.isYearKnown) {
            return `Turning ${this.nextAge - 1} today!`
          }
          return 'Birthday today!'
        }
        if (this.isYearKnown) {
          return `Will turn ${this.nextAge} in`
        }
        return `Birthday in`
      },
    },
    watch: {
      dob() {
        this.wrongDateEntered = false
      },
    },
    created() {
      this.newName = this.name
      if (this.isYearKnown) {
        this.dob = format(this.birthday, 'dd/MM/yyyy')
      } else {
        this.dob = `${this.birthday.getDate()}/${format(this.birthday, 'MM')}`
      }
    },
    methods: {
      switchToEditMode($event, inputToFocusOn = 'name') {
        this.isEditMode = true
        this.$nextTick(() => this.$refs[inputToFocusOn].focus())
      },
      updatePerson() {
        let dateFormat = 'dd/MM/yyyy'
        if (!containsYear(this.dob)) {
          dateFormat = 'dd/MM'
        }
        const newBirthdayDate = parse(this.dob, dateFormat, new Date(1901, 0, 1))
        if (!(newBirthdayDate instanceof Date) || isNaN(newBirthdayDate)) {
          this.wrongDateEntered = true
        } else {
          this.isEditMode = false
          const newBirthday = new Date(
            Date.UTC(
              newBirthdayDate.getFullYear(),
              newBirthdayDate.getMonth(),
              newBirthdayDate.getDate()
            )
          )
          importantPersons.updatePerson(this.$store, {
            id: this.id,
            name: this.newName,
            birthday: newBirthday,
          })
        }
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

    &:hover .edit-btn,
    &:hover .delete-btn {
      opacity: 1;
    }

    @media (max-width: 399px) {
      width: 300px;
    }

    @media (min-width: 400px) and (max-width: 664px) {
      width: 350px;
    }

    @media (min-width: 665px) and (max-width: 762px) {
      width: 300px;
    }

    @media (min-width: 763px) and (max-width: 1064px) {
      width: 350px;
    }

    @media (min-width: 1065px) and (max-width: 1263px) {
      width: 300px;
    }

    @media (min-width: 1264px) {
      width: 350px;
    }
  }

  .edit-btn,
  .delete-btn,
  .submit-btn,
  .cancel-btn {
    position: absolute;
    top: 0;
    right: 0;
    color: rgba(0, 0, 0, 0.5);
    margin: 4px;
  }
  .edit-btn,
  .delete-btn {
    opacity: 1;
    transition: opacity ease-in-out 200ms;

    @media (min-width: 665px) {
      opacity: 0;
    }
  }
  .delete-btn,
  .cancel-btn {
    top: 35px;
  }
</style>

<style>
  .centered-input input {
    text-align: center;
  }
  .big-font-input {
    font-size: 24px;
  }
  .small-width-input {
    max-width: 210px;
  }
  .small-width-input i {
    font-size: 16px !important;
  }
</style>
