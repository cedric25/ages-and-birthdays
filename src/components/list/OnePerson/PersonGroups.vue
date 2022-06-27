<template>
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Group } from '@/@types/Group'
import * as importantPersons from '@/helpers/importantPersons'
import { useAppStore } from '@/store/app/app.store'

const props = defineProps<{
  personId: string
  personGroups?: Group[]
  isEditMode: boolean
}>()

const hasGroups = computed(
  () => props.personGroups && props.personGroups.length > 0
)

const appStore = useAppStore()
const otherGroups = computed(() =>
  appStore.groups.filter((group: Group) => !isInGroup(group))
)

function isInGroup(group: Group) {
  return props.personGroups && props.personGroups.includes(group)
}

function addToGroup(group: Group) {
  importantPersons.addGroupToPerson(props.personId, group)
}

function removeFromGroup(group: Group) {
  importantPersons.removeGroupFromPerson(props.personId, group)
}
</script>
