<template>
  <div class="one-person">
    <div v-if="hasGroups" class="pr-8 text-left">
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

    <div v-if="isEditMode" class="pr-10 text-left">
      <Chip
        v-for="group in otherGroups"
        :key="group"
        class="mr-2 mt-1"
        clickable
        @click.native="addToGroup(group)"
      >
        {{ group }} <i class="fa fa-plus ml-1 -mr-px text-xs" />
      </Chip>
    </div>

    <div
      v-if="!isEditMode && (person.parentOne || person.parentTwo)"
      class="-mb-2 text-center text-sm"
    >
      ({{ person.parentOne?.name ?? '?' }} +
      {{ person.parentTwo?.name ?? '?' }})
    </div>
    <div v-else class="mt-2 mb-2 flex justify-center">
      <div v-if="isEditMode" class="relative mx-auto mt-3">
        <input
          v-model="newParentOne.name"
          placeholder="Parent 1..."
          class="input mr-2 max-w-[100px] pl-3 text-center"
          @keyup.enter="updatePerson"
        />
        <input
          v-model="newParentTwo.name"
          placeholder="Parent 2..."
          class="input ml-2 max-w-[100px] pl-3 text-center"
          @keyup.enter="updatePerson"
        />
      </div>
    </div>

    <input
      v-if="isEditMode"
      ref="name"
      v-model="newName"
      name="name"
      placeholder="Name"
      class="input mx-auto mt-4 block w-full max-w-[85%] text-center"
      :class="
        newName.length > 20
          ? 'text-base'
          : newName.length > 10
          ? 'text-lg'
          : 'text-xl'
      "
      @keyup.enter="updatePerson"
      @keyup.esc="cancelEdit"
    />
    <h3
      v-if="!isEditMode"
      class="mt-3 text-center"
      :class="
        newName.length > 20
          ? 'text-base'
          : newName.length > 10
          ? 'text-lg'
          : 'text-xl'
      "
      @dblclick="switchToEditMode"
    >
      {{ person.name }}
      <span v-if="isBaby" class="baby-icon">👶</span>
    </h3>

    <div class="mt-2 mb-2 flex justify-center">
      <div v-if="isEditMode" class="relative mx-auto mt-3">
        <i
          class="fa fa-calendar-week absolute left-0 text-sm"
          style="top: 4px"
        />
        <input
          ref="dob"
          v-model="dob"
          name="dob"
          placeholder="DD/MM/YYYY"
          class="input max-w-[130px] pl-3 text-center"
          :error="wrongDateEntered"
          @keyup.enter="updatePerson"
          @keyup.esc="cancelEdit"
        />
        <div class="mt-1 text-center text-xs text-gray-400">DD/MM/YYYY</div>
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

    <div v-if="!isEditMode" class="mt-1 text-center">
      <span> {{ textBeforeDays }} </span>&nbsp;<span v-if="!isBirthdayToday">
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
import { mapState } from 'pinia'
import { useAppStore } from '@/store/app/app.store.ts'
import * as importantPersons from '@/helpers/importantPersons'
import { containsYear } from '@/helpers/date'

export default {
  props: {
    person: { type: Object, required: true },
  },
  data: vm => ({
    isEditMode: false,
    newName: '',
    dob: '',
    wrongDateEntered: false,
    newParentOne: {
      id: vm.person.parentOne?.id,
      name: vm.person.parentOne?.name,
    },
    newParentTwo: {
      id: vm.person.parentTwo?.id,
      name: vm.person.parentTwo?.name,
    },
  }),
  computed: {
    ...mapState(useAppStore, ['groups']),
    birthday() {
      return this.person.birthday
    },
    personGroups() {
      return this.person.groups
    },
    age() {
      return this.person.age
    },
    daysUntilBirthday() {
      return this.person.daysUntilBirthday
    },
    isBirthdayToday() {
      return this.daysUntilBirthday === 0
    },
    hasGroups() {
      return this.personGroups && this.personGroups.length > 0
    },
    isYearKnown() {
      return this.birthday.getFullYear() > 1910
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
        if (this.age.value === 1) {
          unit = ' month old'
        } else {
          unit = ' months old'
        }
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
    this.newName = this.person.name
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
        return
      }
      this.isEditMode = false
      const newBirthday = new Date(
        Date.UTC(
          newBirthdayDate.getFullYear(),
          newBirthdayDate.getMonth(),
          newBirthdayDate.getDate()
        )
      )
      importantPersons.updatePerson({
        id: this.person.id,
        name: this.newName,
        birthday: newBirthday.toISOString(),
        ...(this.newParentOne.name && {
          parentOne: {
            ...(this.newParentOne.id && { id: this.newParentOne.id }),
            name: this.newParentOne.name,
          },
        }),
        ...(this.newParentTwo.name && {
          parentTwo: {
            ...(this.newParentTwo.id && { id: this.newParentTwo.id }),
            name: this.newParentTwo.name,
          },
        }),
      })
    },
    deletePerson() {
      this.$emit('wantToDelete', {
        id: this.person.id,
        name: this.person.name,
      })
    },
    cancelEdit() {
      this.isEditMode = false
      this.newName = this.person.name
    },
    isInGroup(group) {
      return this.personGroups && this.personGroups.includes(group)
    },
    addToGroup(group) {
      importantPersons.addGroupToPerson(this.person.id, group)
    },
    removeFromGroup(group) {
      importantPersons.removeGroupFromPerson(this.person.id, group)
    },
  },
}
</script>

<style scoped lang="scss">
.one-person {
  @apply bg-white;
  @apply px-2 pb-5 pt-2;
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
    @apply rounded-full bg-white;
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
