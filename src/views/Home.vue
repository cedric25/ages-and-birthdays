<template>
  <transition name="slide">
    <div class="p-6">
      <h2 class="subtitle">
        Can't remember ages and birthdays? Me neither...
      </h2>

      <AddBirthDatePanel />

      <ManageGroupsPanel />

      <hr />

      <important-persons />
    </div>
  </transition>
</template>

<script>
  import AddBirthDatePanel from '../components/addBirthDate/AddBirthDatePanel.vue'
  import ManageGroupsPanel from '../components/manageGroups/ManageGroupsPanel.vue'
  import ImportantPersons from '../components/list/ImportantPersons.vue'

  export default {
    components: {
      AddBirthDatePanel,
      ManageGroupsPanel,
      ImportantPersons,
    },
  }
</script>

<style scoped>
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

  hr {
    margin: 20px 0;
  }

  .slide-enter-active {
    transition: transform 0.3s ease;
  }
  .slide-enter {
    transform: translateX(-50%);
  }
  .slide-leave {
    opacity: 0;
  }
</style>
