<template>
  <div class="mt-2 mb-2 flex justify-center">
    <div v-if="isEditMode" class="relative mx-auto mt-3">
      <input
        ref="dobInput"
        type="date"
        :value="dob"
        @input="$emit('update:dob', $event.target.value)"
        name="dob"
        class="input max-w-[130px] pl-3 text-center"
        :class="wrongDateEntered && '!border-b-red-400'"
        @keyup.esc="$emit('cancel-edit')"
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
        @dblclick="
          $emit('switch-to-edit-mode', {
            inputToFocus: 'personDob',
          })
        "
      >
        {{ formatDateForDisplay(birthday) }}
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DateOfBirth } from '@/@types/DateOfBirth'
import { formatDateForDisplay } from '@/helpers/dateFormatters'

const props = defineProps<{
  personId: string
  birthday: DateOfBirth
  dob: string
  isYearKnown: boolean
  age?: { unit: 'years' | 'months'; value: number } | null
  daysUntilBirthday: number
  isEditMode: boolean
  wrongDateEntered: boolean
}>()

defineEmits<{
  (e: 'update:dob', val: string): void
  (e: 'switch-to-edit-mode', payload: { inputToFocus: 'personName' }): void
  (e: 'cancel-edit'): void
}>()

const ageValue = computed(() => {
  if (!props.age) {
    return null
  }
  let unit = 'y old'
  if (props.age.unit === 'months') {
    if (props.age.value === 0) {
      return {
        value: 'New born!',
        unit: null,
      }
    }
    if (props.age.value === 1) {
      unit = ' month old'
    } else {
      unit = ' months old'
    }
  }
  return {
    value: props.age.value,
    unit,
  }
})

const isBirthdayToday = computed(() => {
  return props.daysUntilBirthday === 0
})

const nextAge = computed(() => {
  if (!props.age) {
    return null
  }
  if (props.age.unit === 'months') {
    return 1
  }
  return props.age.value + 1
})

const textBeforeDays = computed(() => {
  if (isBirthdayToday.value) {
    if (nextAge.value) {
      return `Turning ${nextAge.value - 1} today!`
    }
    return 'Birthday today!'
  }
  if (props.isYearKnown) {
    return `Will turn ${nextAge.value} in`
  }
  return `Birthday in`
})
</script>
