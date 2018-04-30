<template>
  <div>

    Order by:
    <v-chip
      color="secondary"
      text-color="white"
      :selected="selectedOrder === 'daysUntilBirthday'"
      @click="selectOrder('daysUntilBirthday')"
      @keyup.enter="selectOrder('daysUntilBirthday')"
    >
      upcoming birthdays
    </v-chip>
    <v-chip
      color="secondary"
      text-color="white"
      :selected="selectedOrder === 'name'"
      @click="selectOrder('name')"
      @keyup.enter="selectOrder('name')"
    >
      name
    </v-chip>
    <v-chip
      color="secondary"
      text-color="white"
      :selected="selectedOrder === 'age'"
      @click="selectOrder('age')"
      @keyup.enter="selectOrder('age')"
    >
      ages
    </v-chip>

    <transition-group name="flip-list">
      <div v-for="person in persons" :key="person.name" class="person">

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
    </transition-group>
  </div>
</template>

<script>
  import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'

  import { mapGetters } from 'vuex'

  const today = new Date()

  export default {
    data() {
      return {
        selectedOrder: '',
      }
    },
    computed: {
      persons() {
        const personsList = this.buildPersons(this.importantPersons)
        return this.sortPersons(personsList, this.selectedOrder)
      },
      ...mapGetters([
        'importantPersons',
      ])
    },
    methods: {
      buildPersons(serverPersons) {
        return serverPersons && serverPersons.map(person => {
          return {
            name: person.name,
            birthDate: this.birthDate(person),
            age: this.age(person),
            daysUntilBirthday: this.daysUntilBirthday(person.birthday),
          }
        })
      },
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
      sortPersons(personsList, selectedOrder) {
        if (selectedOrder) {
          return personsList.sort((p1, p2) => this.compare(p1, p2, selectedOrder))
        }
        return personsList
      },
      compare(p1, p2, prop) {
        return p1[prop] > p2[prop]
      },
      selectOrder(order) {
        this.selectedOrder = order
      },
    }
  }
</script>

<style scoped lang="scss">
  .flip-list-move {
    transition: transform 1s;
  }

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
