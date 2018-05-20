<template>
  <div>

    <div v-if="importantPersons.length > 0" class="list-header">
      <div>
        Order by:
        <v-chip
          :selected="selectedOrder === 'daysUntilBirthday'"
          color="secondary"
          text-color="white"
          @click="selectOrder('daysUntilBirthday')"
          @keyup.enter="selectOrder('daysUntilBirthday')"
        >
          upcoming birthdays
        </v-chip>
        <v-chip
          :selected="selectedOrder === 'name'"
          color="secondary"
          text-color="white"
          @click="selectOrder('name')"
          @keyup.enter="selectOrder('name')"
        >
          names
        </v-chip>
        <v-chip
          :selected="selectedOrder === 'age'"
          color="secondary"
          text-color="white"
          @click="selectOrder('age')"
          @keyup.enter="selectOrder('age')"
        >
          ages
        </v-chip>
      </div>

      <div>
        <v-chip
          v-for="group in groups"
          :key="group"
          :selected="isGroupSelected(group)"
          color="secondary"
          text-color="white"
          @click="filterByGroup(group)"
        >
          <v-avatar class="secondary darken-4">
            {{ nbPersonsWithinGroup(group) }}
          </v-avatar>
          {{ group }}
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
import computeAge from '../../helpers/computeAge'
import comparePersons from '../../helpers/comparePersons'
import OnePerson from './OnePerson.vue'

const today = new Date()

export default {
  components: {
    OnePerson,
  },
  data() {
    return {
      selectedOrder: 'daysUntilBirthday',
      selectedGroups: [],
    }
  },
  computed: {
    ...mapGetters([
      'importantPersons',
      'groups',
    ]),
    persons() {
      // Apply filters and sort persons from state
      let personsList = this.buildPersons(this.importantPersons)
      if (this.selectedGroups.length > 0) {
        personsList = personsList.filter(person => {
          const commonGroups = this.selectedGroups.filter(group => {
            return person.groups && person.groups.includes(group)
          })
          return commonGroups.length > 0
        })
      }
      return this.sortPersons(personsList, this.selectedOrder)
    },
  },
  methods: {
    buildPersons(serverPersons) {
      return serverPersons && Object.values(serverPersons).map(person => {
        return {
          id: person.id,
          name: person.name,
          birthday: person.birthday,
          age: computeAge(new Date(), person.birthday),
          daysUntilBirthday: this.daysUntilBirthday(person.birthday),
          groups: person.groups && person.groups.sort(),
        }
      })
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
      return month1 > month2 || (month1 === month2 && day1 >= day2)
    },
    sortPersons(personsList, selectedOrder) {
      if (selectedOrder) {
        return personsList.sort((p1, p2) => comparePersons(p1, p2, selectedOrder))
      }
      return personsList
    },
    selectOrder(order) {
      this.selectedOrder = order
    },
    clearList() {
      this.$store.commit('removeAllPersons')
    },
    isGroupSelected(groupLabel) {
      return this.selectedGroups.indexOf(groupLabel) !== -1
    },
    filterByGroup(groupLabel) {
      if (this.selectedGroups.indexOf(groupLabel) !== -1) {
        this.selectedGroups = this.selectedGroups.filter(group => {
          return group !== groupLabel
        })
      } else {
        this.selectedGroups.push(groupLabel)
      }
    },
    nbPersonsWithinGroup(group) {
      return this.importantPersons.filter(person => {
        return person.groups && person.groups.includes(group)
      }).length
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
      border-color: rgb(25, 118, 210) !important;
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
