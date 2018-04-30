<template>
  <div>

    <div v-if="persons.length > 0" class="list-header">
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
          names
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
      </div>
      <div>
        <v-btn color="error" @click="clearList()">
          Clear list?
        </v-btn>
      </div>
    </div>

    <transition-group name="flip-list" tag="div" class="persons-grid">
      <div v-for="person in persons" :key="person.id">
        <one-person :person="person" />
      </div>
    </transition-group>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
  import OnePerson from './OnePerson.vue'

  const today = new Date()

  export default {
    components: {
      OnePerson,
    },
    data() {
      return {
        selectedOrder: 'daysUntilBirthday',
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
        return serverPersons && Object.values(serverPersons).map(person => {
          return {
            id: person.id,
            name: person.name,
            birthDate: this.birthDate(person),
            age: this.age(person),
            daysUntilBirthday: this.daysUntilBirthday(person.birthday),
          }
        })
      },
      birthDate(person) {
        const day = person.day[0] === '0' ? person.day[1] : person.day
        return `${day} ${person.monthLabel} ${person.year}`
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
      clearList() {
        this.$store.commit('removeAllPersons')
      },
    }
  }
</script>

<style scoped lang="scss">
  .list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .chip:focus {
      background-color: #555 !important;
    }
  }

  .flip-list-move {
    transition: transform .8s;
  }

  .chip /deep/ span {
    cursor: pointer;
  }

  .chip--selected {
    box-shadow: none;
    border-color: rgb(25, 118, 210) !important;

    &:focus /deep/ span {
      background: rgb(25, 118, 210);
    }

    &::after {
      background: rgb(25, 118, 210);
      opacity: 1;
    }
  }

  .persons-grid {
    display: grid;
    grid-template-columns: auto;
    justify-items: center;
    grid-gap: 0 30px;
  }
  @media (min-width: 700px) {
    .persons-grid {
      grid-template-columns: auto auto;
    }
  }
  @media (min-width: 1000px) {
    .persons-grid {
      grid-template-columns: auto auto auto;
    }
  }
</style>
