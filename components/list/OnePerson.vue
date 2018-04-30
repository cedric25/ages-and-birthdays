<template>
  <div class="person">

    <div class="name">
      {{ person.name }}
    </div>

    <div class="first-line">
      <v-chip color="accent" text-color="white">
        <span class="age">{{ person.age }}</span>&nbsp;year{{ person.age > 0 && 's' || '' }} old
      </v-chip>
      <v-chip color="green" text-color="white">
        Born on {{ person.birthDate }}
      </v-chip>
    </div>

    <div>
      Will turn {{ person.age + 1 }} in
      <strong>{{ person.daysUntilBirthday }}</strong> day{{ person.daysUntilBirthday > 1 && 's' || '' }}
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      person: Object,
    },
  }
</script>

<style scoped lang="scss">
  .person {
    display: flex;
    flex-direction: column;
    border: 1px solid blue;
    padding: 5px;
    margin-bottom: 5px;

    .name {
      font-size: 1.2em;
    }

    .first-line {
      display: flex;
      align-items: center;
      justify-content: center;

      > * {
        margin: 5px;
      }

      .age {
        font-weight: bold;
        font-size: 1.1em;
      }
    }
  }
</style>
