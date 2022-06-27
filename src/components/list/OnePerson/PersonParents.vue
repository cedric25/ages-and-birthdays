<template>
  <div
    v-if="!isEditMode && (parentOne || parentTwo)"
    class="-mb-2 text-center text-sm"
  >
    ({{ parentOne ?? '?' }} + {{ parentTwo ?? '?' }})
  </div>
  <div v-else-if="isEditMode" class="mt-2 mb-2 flex justify-center">
    <div class="relative mx-auto mt-3">
      <input
        :value="parentOne"
        @input="$emit('update:parentOne', $event.target.value)"
        placeholder="Parent 1..."
        class="input mr-2 max-w-[100px] pl-3 text-center"
        @keyup.esc="$emit('cancel-edit')"
      />
      <input
        :value="parentTwo"
        @input="$emit('update:parentTwo', $event.target.value)"
        placeholder="Parent 2..."
        class="input ml-2 max-w-[100px] pl-3 text-center"
        @keyup.esc="$emit('cancel-edit')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Parent } from '@/@types/Parent'

const props = defineProps<{
  personId: string
  parentOne?: Parent
  parentTwo?: Parent
  isEditMode: boolean
}>()

defineEmits<{
  (e: 'update:parentOne', val: string): void
  (e: 'update:parentTwo', val: string): void
  (e: 'cancel-edit'): void
}>()
</script>
