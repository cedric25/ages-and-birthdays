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
      :days-until-birthday="person.daysUntilBirthday"
      :is-edit-mode="isEditMode"
      :wrong-date-entered="wrongDateEntered"
      @switch-to-edit-mode="switchToEditMode"
      @cancel-edit="cancelEdit"
    />

    <PersonKids v-if="kids?.length" :kids="kids" />

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
import { Temporal } from '@js-temporal/polyfill'
import { mapState } from 'pinia'
import { useAppStore } from '@/store/app/app.store.ts'
import * as importantPersons from '@/helpers/importantPersons'
import { isBaby } from '@/helpers/isBaby.ts'
import { formatDateForInput } from '@/helpers/dateFormatters.ts'
import { checkEnteredDate } from '@/helpers/checkEnteredDate.ts'

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
      // Temporal.PlainDate | Temporal.PlainMonthDay
      // '1989-07-22' or '07-22' (July 22nd)
      return this.person.birthday
    },
    age() {
      return this.person.age
    },
    isYearKnown() {
      return this.birthday instanceof Temporal.PlainDate
    },
    isBaby() {
      return this.isYearKnown && isBaby(this.age)
    },
    kids() {
      const appStore = useAppStore()
      return appStore.getKids(this.person.name)
    },
  },
  created() {
    this.dob = formatDateForInput(this.birthday)
  },
  methods: {
    // switchToEditMode({ inputToFocus }: { inputToFocus: 'personName' | 'personDob' }) {
    switchToEditMode({ inputToFocus = 'personName' }) {
      this.isEditMode = true
      if (inputToFocus === 'personName') {
        this.$nextTick(() => this.$refs.personName.$refs.nameInput.focus())
      } else if (inputToFocus === 'personDob') {
        this.$nextTick(() => this.$refs.personDobAndAge.$refs.dobInput.focus())
      }
    },
    updatePerson() {
      if (!this.newName?.trim()) return
      const newBirthday = checkEnteredDate(this.dob)
      if (!newBirthday) {
        console.error(`Wrong date: ${this.dob}`)
        this.wrongDateEntered = true
        return
      }
      this.isEditMode = false
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
