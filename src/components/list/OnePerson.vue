<template>
  <div class="one-person">
    <div v-if="hasGroups" class="text-left pr-8">
      <Chip
        v-for="group in personGroups"
        :key="group"
        class="mr-2 mb-2"
        outlined
        red
        :closable="isEditMode"
        @close="removeFromGroup(group)"
      >
        {{ group }}
      </Chip>
    </div>

    <div v-if="isEditMode" class="mt-2 ml-2 pr-10 text-left">
      <Chip
        v-for="group in otherGroups"
        :key="group"
        class="mr-2 mt-2"
        clickable
        @click.native="addToGroup(group)"
      >
        {{ group }}
      </Chip>
    </div>

    <input
      v-if="isEditMode"
      ref="name"
      v-model="newName"
      name="name"
      placeholder="Name"
      class="input mt-4 px-10 text-xl text-center block mx-auto"
      @keyup.enter="updatePerson"
      @keyup.esc="cancelEdit"
    />
    <h3
      v-if="!isEditMode"
      class="mt-3 text-center text-xl"
      @dblclick="switchToEditMode"
    >
      {{ name }}
      <span v-if="isBaby" class="baby-icon">👶</span>
    </h3>

    <div class="flex justify-center mt-2 mb-2">
      <div v-if="isEditMode" class="mx-auto mt-3 relative">
        <i
          class="fa fa-calendar-week text-sm absolute left-0"
          style="top: 4px"
        />
        <input
          ref="dob"
          v-model="dob"
          name="dob"
          placeholder="DD/MM/YYYY"
          class="input text-center pl-3"
          style="max-width: 130px"
          :error="wrongDateEntered"
          @keyup.enter="updatePerson()"
          @keyup.esc="cancelEdit()"
        />
      </div>
      <div
        v-if="!isEditMode"
        class="flex-1"
        :class="isYearKnown ? 'text-right' : 'text-center'"
      >
        <Chip
          green
          class="mr-1"
          @dblclick="$event => switchToEditMode($event, 'dob')"
        >
          {{ readableBirthday }}
        </Chip>
      </div>
      <div class="text-left" v-if="!isEditMode && isYearKnown" style="flex: 1">
        <Chip light-blue class="ml-1">
          {{ ageValue.value }}{{ ageValue.unit }}</Chip
        >
      </div>
    </div>

    <div v-if="!isEditMode" class="birthday-in-wrap mt-1 text-center">
      <span>
        {{ textBeforeDays }}
      </span>
      <span v-if="!isBirthdayToday">
        <strong>{{ daysUntilBirthday }}</strong> day{{
          (daysUntilBirthday > 1 && 's') || ''
        }}
      </span>
      <span v-else class="cake-icon"> 🎂 </span>
    </div>

    <template v-if="!isEditMode">
      <button class="edit-btn" @click="switchToEditMode">
        <i class="fa fa-edit" />
      </button>
      <button class="delete-btn" @click="deletePerson">
        <i class="fa fa-trash" />
      </button>
    </template>

    <template v-if="isEditMode">
      <button class="submit-btn" @click="updatePerson">
        <i class="fa fa-check" />
      </button>
      <button class="cancel-btn" @click="cancelEdit">
        <i class="fa fa-undo" />
      </button>
    </template>
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
      return (
        this.isYearKnown && (this.age.unit === 'months' || this.age.value < 3)
      )
    },
    ageValue() {
      let unit = 'y old'
      if (this.age.unit === 'months') {
        if (this.age.value === 0) {
          return {
            value: 'New born!',
            unit: null,
          }
        }
        unit = ' months old'
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
      if (!this.newName) return
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
          birthday: newBirthday.toISOString(),
        })
      }
    },
    deletePerson() {
      this.$emit('wantToDelete', {
        id: this.id,
        name: this.name,
      })
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
.one-person {
  @apply bg-white;
  @apply pb-5 pt-2 px-2;
  @apply relative;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);

  .edit-btn,
  .delete-btn,
  .submit-btn,
  .cancel-btn {
    @apply text-gray-700;
    @apply absolute;
    @apply flex items-center justify-center;
    @apply bg-white rounded-full;
    @apply outline-none;
    right: 6px;
    width: 36px;
    height: 36px;

    &:hover {
      @apply bg-gray-200;
    }
  }
  .edit-btn,
  .submit-btn {
    top: 6px;
  }
  .delete-btn,
  .cancel-btn {
    top: 43px;
  }

  @media (min-width: 768px) {
    .edit-btn,
    .delete-btn {
      //@apply opacity-0;
      @apply transition duration-300;
    }
    &:hover {
      .edit-btn,
      .delete-btn {
        @apply opacity-100;
      }
    }
  }
}
</style>
