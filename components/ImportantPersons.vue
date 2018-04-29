<template>
  <div>
    <div v-for="person in importantPersons" :key="person.name" class="person">

      <div class="name">
        {{ person.name }}
      </div>

      <div class="first-line">
        <v-chip color="accent" text-color="white">
          <span class="age">{{ age(person) }}</span>&nbsp;year{{ age(person) > 0 && 's' || '' }} old
        </v-chip>
        <v-chip color="green" text-color="white">
          Born on {{ birthDate(person) }}
        </v-chip>
      </div>

      <div>
        Will turn {{ age(person) + 1 }} in
        <strong>{{ daysUntilBirthday(person.birthday) }}</strong> day{{ daysUntilBirthday(person.birthday) > 1 && 's' || '' }}
      </div>
    </div>
  </div>
</template>

<script>
  import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'

  import { mapGetters } from 'vuex'

  const today = new Date()

  export default {
    computed: mapGetters([
      'importantPersons',
    ]),
    methods: {
      birthDate(person) {
        return `${person.day} ${person.monthLabel} ${person.year}`
      },
      age(person) {

        const currentYear = today.getFullYear()
        const currentMonth = today.getMonth() + 1
        const currentDay = today.getDate()

        const personYear = parseInt(person.year, 10)
        const personMonth = person.monthNo
        const personDay = parseInt(person.day)

        return this.computePersonAge(
          { currentYear, currentMonth, currentDay },
          { personYear, personMonth, personDay }
        )
      },
      computePersonAge(today, personBirthday) {
        const { currentYear, currentMonth, currentDay } = today
        const { personYear, personMonth, personDay } = personBirthday

        return this.isDayMonthLater({ day1: currentDay, month1: currentMonth }, { day2: personDay, month2: personMonth })
          ? currentYear - personYear : currentYear - personYear - 1
      },
      daysUntilBirthday(birthday) {
        let nextBirthday
        if (typeof birthday === 'string') {
          nextBirthday = new Date(birthday)
        } else {
          nextBirthday = new Date(birthday.getTime())
        }
        nextBirthday.setFullYear(today.getFullYear())
        if (this.isDayMonthLater(
          { day1: nextBirthday.getDate(), month1: nextBirthday.getMonth() },
          { day2: today.getDate(), month2: today.getMonth() }
        )) {
          nextBirthday.setFullYear(today.getFullYear())
          return differenceInCalendarDays(nextBirthday, today.getTime())
        }
        nextBirthday.setFullYear(today.getFullYear() + 1)
        return differenceInCalendarDays(nextBirthday, today.getTime())
      },
      isDayMonthLater({ day1, month1 }, { day2, month2 }) {
        return month1 > month2 || month1 === month2 && day1 >= day2
      },
    }
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
