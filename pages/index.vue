<template>
  <section class="container">
    <div>
      <h1 class="title">
        ages-and-birthdays
      </h1>

      <h2 class="subtitle">
        Can't remember ages and birthdays? Me neither...
      </h2>

      <add-birth-date />

      <important-persons />

    </div>
  </section>
</template>

<script>
  import AddBirthDate from '~/components/AddBirthDate.vue'
  import ImportantPersons from '~/components/ImportantPersons.vue'

  export default {
    components: {
      AddBirthDate,
      ImportantPersons,
    }
  }
</script>

<style>
  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
