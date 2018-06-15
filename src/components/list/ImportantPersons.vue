<template>
  <div>

    <div class="admin-actions px-2">
      <ab-import-export />

      <div v-if="importantPersons.length > 0" class="ml-3">
        <v-btn color="error" @click="clearList()">
          Clear list?
        </v-btn>
      </div>
    </div>

    <div v-if="importantPersons.length > 0" class="list-header">

      <div class="order-and-total px-2">

        <ab-order-by
          :selected-order="selectedOrder"
          @order="selectOrder"
        ></ab-order-by>

        <div class="total-persons pr-2">
          <strong>{{ importantPersons.length }}</strong> important persons
        </div>

      </div>

      <div class="groups-and-members-count">
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

    </div>

    <transition-group name="flip-list" tag="div" class="persons-grid">
      <div v-for="person in persons" :key="person.id">
        <one-person
          :id="person.id"
          :name="person.name"
          :birthday="person.birthday"
          :age="person.age"
          :days-until-birthday="person.daysUntilBirthday"
          :person-groups="person.groups"
        />
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import { computeAge } from '../../helpers/computeAge'
import comparePersons from '../../helpers/comparePersons'
import OnePerson from './OnePerson.vue'
import OrderBy from './OrderBy.vue'
import ImportExport from './ImportExport'

const today = new Date()

export default {
  components: {
    OnePerson,
    'ab-order-by': OrderBy,
    'ab-import-export': ImportExport,
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
          birthday: new Date(person.birthday),
          age: computeAge(new Date(), new Date(person.birthday)),
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

  .admin-actions {
    display: none;
  }

  @media (min-width: 700px) {
    .admin-actions {
      display: flex;
      justify-content: flex-end;
    }
  }

  .list-header > div {
    display: flex;
    align-items: center;

    &.order-and-total {
      display: flex;
      margin: 7px 0;
    }

    @media (max-width: 699px) {
      &.order-and-total {
        flex-direction: column-reverse;

        > div {
          width: 100%;
        }

        .total-persons {
          text-align: right;
        }
      }
    }

    @media (min-width: 700px) {
      &.order-and-total {
        flex-direction: row;
        justify-content: space-between;

        .total-persons {
          flex-grow: 1;
          text-align: right;
        }
      }
    }

    &.groups-and-members-count {
      display: block;
      text-align: left;

      .chip:focus {
        border-color: rgb(25, 118, 210) !important;
      }
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
    grid-template-columns: 1fr;
    justify-items: center;
    grid-gap: 0 15px;
  }
  @media (min-width: 665px) {
    .persons-grid {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 0 15px;
    }
  }
  @media (min-width: 1065px) {
    .persons-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
