<template>
  <section class="container">

    <h1 class="app-title">
      Ages and Birthdays
    </h1>

    <h2 class="subtitle">
      Can't remember ages and birthdays?<br>
      Me neither...
    </h2>

    <add-birth-date />

    <hr>

    <important-persons />

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
    flex-direction: column;
    text-align: center;
  }

  .app-title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: block;
    font-size: 40px;
    font-weight: 300;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 32px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  hr {
    margin: 20px 0;
  }
</style>
