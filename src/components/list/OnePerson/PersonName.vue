<template>
  <input
    v-if="isEditMode"
    ref="nameInput"
    :value="name"
    @input="$emit('update:name', $event.target.value)"
    name="name"
    placeholder="Name"
    class="input mx-auto mt-4 block w-full max-w-[85%] text-center"
    :class="
      name.length > 20 ? 'text-base' : name.length > 10 ? 'text-lg' : 'text-xl'
    "
    @keyup.esc="$emit('cancel-edit')"
  />
  <h3
    v-if="!isEditMode"
    class="mt-3 text-center"
    :class="
      name.length > 20 ? 'text-base' : name.length > 10 ? 'text-lg' : 'text-xl'
    "
    @dblclick="
      $emit('switch-to-edit-mode', {
        inputToFocus: 'personName',
      })
    "
  >
    {{ name }}
    <span v-if="isBaby" class="baby-icon">👶</span>
  </h3>
</template>

<script setup lang="ts">
const props = defineProps<{
  personId: string
  name: string
  isBaby: boolean
  isEditMode: boolean
}>()

defineEmits<{
  (e: 'update:name', val: string): void
  (e: 'switch-to-edit-mode', payload: { inputToFocus: 'personName' }): void
  (e: 'cancel-edit'): void
}>()
</script>
