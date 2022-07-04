<template>
  <div class="mt-3">
    <div
      v-for="kid of kids"
      class="grid grid-cols-3 border-t px-3 py-1 text-sm"
    >
      <div>👶&nbsp; {{ kid.name }}</div>
      <div>{{ formatDateForDisplay(kid.birthday) }}</div>
      <div>{{ getReadableAge(kid.birthday) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Person } from '@/@types/Person'
import { formatDateForDisplay } from '@/helpers/dateFormatters'
import { getReadableAge } from '@/helpers/readableAge'

defineProps<{
  kids: Person[]
}>()
</script>
