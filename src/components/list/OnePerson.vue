<template>
  <form class="one-person">
    <PersonGroups
      :person-id="person.id"
      :person-groups="person.groups"
      :is-edit-mode="isEditMode"
    />

    <PersonParents
      :person-id="person.id"
      v-model:parentOne="newParentOne"
      v-model:parentTwo="newParentTwo"
      :is-edit-mode="isEditMode"
    />

    <PersonName
      ref="personName"
      :person-id="person.id"
      v-model:name="newName"
      :is-baby="isBaby"
      :is-edit-mode="isEditMode"
      @switch-to-edit-mode="switchToEditMode"
      @cancel-edit="cancelEdit"
    />

    <PersonDobAndAge
      ref="personDobAndAge"
      :person-id="person.id"
      v-model:dob="dob"
      :birthday="person.birthday"
      :is-year-known="isYearKnown"
      :age="person.age"
      :is-edit-mode="isEditMode"
      @switch-to-edit-mode="switchToEditMode"
      @cancel-edit="cancelEdit"
    />

    <div v-if="!isEditMode" class="mt-1 text-center">
      <span> {{ textBeforeDays }} </span>&nbsp;<span v-if="!isBirthdayToday">
        <strong>{{ daysUntilBirthday }}</strong> day{{
          (daysUntilBirthday > 1 && 's') || ''
        }}
      </span>
      <span v-else class="cake-icon"> 🎂 </span>
    </div>

    <template v-if="!isEditMode">
      <button type="button" class="edit-btn" @click="switchToEditMode">
        <i class="fa fa-edit" />
      </button>
      <button type="button" class="delete-btn" @click="deletePerson">
        <i class="fa fa-trash" />
      </button>
    </template>

    <template v-if="isEditMode">
      <button type="submit" class="submit-btn" @click.prevent="updatePerson">
        <i class="fa fa-check" />
      </button>
      <button type="button" class="cancel-btn" @click="cancelEdit">
        <i class="fa fa-undo" />
      </button>
    </template>
  </form>
</template>

<!--<script setup lang="ts">-->
<!--import type { Group } from '@/@types/Group';-->
<!--import type { Parent } from '@/@types/Parent';-->

<!--defineProps<{-->
<!--  person: {-->
<!--    id: string-->
<!--    name: string-->
<!--    birthday: Date-->
<!--    age: {-->
<!--      value: number | null-->
<!--      unit: 'years' | 'months' | null-->
<!--    }-->
<!--    daysUntilBirthday: number-->
<!--    groups: Group[]-->
<!--    parentOne?: Parent-->
<!--    parentTwo?: Parent-->
<!--  }-->
<!--}>()-->
<!--</script>-->

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
    newName: vm.person.name,
    dob: '',
    newParentOne: vm.person.parentOne,
    newParentTwo: vm.person.parentTwo,
    wrongDateEntered: false,
  }),
  computed: {
    ...mapState(useAppStore, ['groups']),
    birthday() {
      return this.person.birthday
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
    isYearKnown() {
      return this.birthday.getFullYear() > 1910
    },
    isBaby() {
      return (
        this.isYearKnown && (this.age.unit === 'months' || this.age.value < 3)
      )
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
  // watch: {
  //   dob() {
  //     this.wrongDateEntered = false
  //   },
  // },
  created() {
    if (this.isYearKnown) {
      this.dob = format(this.birthday, 'dd/MM/yyyy')
    } else {
      this.dob = `${this.birthday.getDate()}/${format(this.birthday, 'MM')}`
    }
  },
  methods: {
    // switchToEditMode({ inputToFocus }: { inputToFocus: 'personName' | 'personDob' }) {
    switchToEditMode({ inputToFocus = 'personName' }) {
      this.isEditMode = true
      if (inputToFocus === 'personName') {
        this.$nextTick(() => this.$refs.personName.$refs.nameInput.focus())
      } else if (inputToFocus === 'personDob') {
        this.$nextTick(() => this.$refs.personDobAndAge.$refs.dob.focus())
      }
    },
    updatePerson() {
      console.log(
        '-> updatePerson',
        this.newName,
        this.dob,
        this.newParentOne,
        this.newParentTwo
      )
      if (!this.newName?.trim()) return
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
      importantPersons.updatePerson(this.person.id, {
        id: this.person.id,
        name: this.newName,
        birthday: newBirthday,
        groups: this.person.groups,
        ...(this.newParentOne && {
          parentOne: this.newParentOne,
        }),
        ...(this.newParentTwo && {
          parentTwo: this.newParentTwo,
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
      // this.newName = this.person.name
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
