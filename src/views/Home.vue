<template>
  <transition name="fade">
    <FixedWidthContainer class="pa-4">
      <h2 class="subtitle">
        Can't remember ages and birthdays? Me neither...
      </h2>

      <AddBirthDatePanel />
      <ManageGroupsPanel />

      <hr />

      <important-persons />
    </FixedWidthContainer>
  </transition>
</template>

<script>
  import FixedWidthContainer from '../components/containers/FixedWidthContainer.vue'
  import AddBirthDatePanel from '../components/addBirthDate/AddBirthDatePanel.vue'
  import ManageGroupsPanel from '../components/manageGroups/ManageGroupsPanel.vue'
  import ImportantPersons from '../components/list/ImportantPersons.vue'

  export default {
    components: {
      FixedWidthContainer,
      AddBirthDatePanel,
      ManageGroupsPanel,
      ImportantPersons,
    },
  }
</script>

<style scoped>
  .subtitle {
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

  .fade-enter-active {
    transition: transform 0.3s ease;
  }
  .fade-enter {
    transform: translateX(-50%);
  }
  .fade-leave {
    opacity: 0;
  }
</style>
