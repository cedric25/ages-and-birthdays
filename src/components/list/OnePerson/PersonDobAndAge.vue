<template>
  <div class="mt-2 mb-2 flex justify-center">
    <div v-if="isEditMode" class="relative mx-auto mt-3">
      <i class="fa fa-calendar-week absolute left-0 text-sm" style="top: 4px" />
      <input
        ref="dob"
        :value="dob"
        @input="$emit('update:dob', $event.target.value)"
        name="dob"
        placeholder="DD/MM/YYYY"
        class="input max-w-[130px] pl-3 text-center"
        @keyup.esc="$emit('cancel-edit')"
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
        @dblclick="
          $emit('switch-to-edit-mode', {
            inputToFocus: 'personDob',
          })
        "
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import format from 'date-fns/format'

const props = defineProps<{
  personId: string
  birthday: Date
  dob: string
  isYearKnown: boolean
  age?: { unit: 'years' | 'months'; value: number }
  isEditMode: boolean
}>()

defineEmits<{
  (e: 'update:dob', val: string): void
  (e: 'switch-to-edit-mode', payload: { inputToFocus: 'personName' }): void
  (e: 'cancel-edit'): void
}>()

const readableBirthday = computed(() => {
  if (!props.isYearKnown) {
    return `${props.birthday.getDate()} ${format(props.birthday, 'MMM')}`
  }
  return format(props.birthday, 'd MMM yyyy')
})

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
</script>
