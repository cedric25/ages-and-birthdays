<template>
  <transition name="slide">
    <div class="home-wrap">
      <h2 class="subtitle">Can't remember ages and birthdays? Me neither...</h2>

      <AddBirthDatePanel />

      <ManageGroupsPanel />

      <hr class="mt-6 mb-5" />

      <ImportantPersons />
    </div>
  </transition>
</template>

<script setup>
import AddBirthDatePanel from './AddBirthDatePanel.vue'
import ManageGroupsPanel from '../../components/groups/ManageGroupsPanel.vue'
import ImportantPersons from '../../components/list/ImportantPersons.vue'
</script>

<style>
.home-wrap {
  @apply p-6 mx-auto;
  max-width: 1000px;
}

@media (min-width: 1200px) {
  .home-wrap {
    max-width: 1185px;
  }
}

.subtitle {
  @apply text-center;
  font-size: 22px;
  font-weight: 300;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

@media (min-width: 450px) {
  .subtitle {
    font-size: 32px;
  }
}
</style>
