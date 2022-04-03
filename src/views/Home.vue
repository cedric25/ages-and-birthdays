<template>
  <transition name="slide">
    <div class="home-wrap">
      <h2 class="subtitle">Can't remember ages and birthdays? Me neither...</h2>

      <AddPersonChoices />

      <ManageGroupsPanel />

      <hr class="mt-6 mb-5" />

      <important-persons />
    </div>
  </transition>
</template>

<style scoped lang="scss">
.home-wrap {
  @apply mx-auto mb-24 p-6;
  max-width: 1000px;

  @media (min-width: 1200px) {
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
