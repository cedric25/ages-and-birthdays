<template>
  <div class="person">

    <v-card>
      <v-card-title>
        <div>
          <h3 class="headline mb-0">
            {{ person.name }}
          </h3>
          <div>
            <v-chip color="green" text-color="white">
              {{ person.birthDate }}
            </v-chip>
            <v-chip color="accent" text-color="white">
              <span class="age">{{ person.age }}</span>y old
            </v-chip>
          </div>
          <div>
            Will turn {{ person.age + 1 }} in
            <strong>{{ person.daysUntilBirthday }}</strong> day{{ person.daysUntilBirthday > 1 && 's' || '' }}
          </div>
        </div>
      </v-card-title>
    </v-card>

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
    width: 350px;
    display: flex;
    flex-direction: column;
    margin: 15px 0;

    .card__title {
      display: flex;

      > div {
        flex: 1;
      }
    }

    .name {
      font-size: 1.2em;
    }

    .age {
      font-weight: bold;
      font-size: 1.1em;
    }
  }
</style>
