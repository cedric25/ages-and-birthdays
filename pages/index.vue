<template>
  <div class="container">

    <h2 class="subtitle">
      Can't remember ages and birthdays? Me neither...
    </h2>

    <add-birth-date/>

    <hr>

    <important-persons/>

  </div>
</template>

<script>
  import AddBirthDate from '~/components/add/AddBirthDate.vue'
  import ImportantPersons from '~/components/list/ImportantPersons.vue'

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
