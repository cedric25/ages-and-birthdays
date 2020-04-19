<template>
  <div class="mt-6">
    <div class="admin-actions px-2" v-if="showAdminActions">
      <ImportExport />

      <div v-if="importantPersons.length > 0" class="ml-3">
        <ClearList />
      </div>
    </div>

    <div v-if="importantPersons.length > 0" class="list-header">
      <div class="order-and-total pa-2">
        <OrderBy :selected-order="selectedOrder" @order="selectOrder" />

        <div class="total-persons pr-2">
          <strong>{{ importantPersons.length }}</strong> important person{{
            importantPersons.length > 1 ? 's' : ''
          }}
        </div>
      </div>

      <div class="mt-4">
        <Chip
          v-for="group in groups"
          :key="group"
          :selected="isGroupSelected(group)"
          clickable
          :count="nbPersonsWithinGroup(group)"
          class="mr-2 mb-2"
          @click.native="filterByGroup(group)"
          >{{ group }}</Chip
        >
      </div>
    </div>

    <transition-group name="flip-list" tag="div" class="persons-grid">
      <div v-for="person in persons" :key="person.id" class="flip-list-item">
        <OnePerson
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
  import * as localStorageHelper from '../../helpers/localStorageHelper'

  // Components
  import ImportExport from './ImportExport'
  import ClearList from './ClearList'
  import OrderBy from './OrderBy'
  import OnePerson from './OnePerson'
  import Chip from '../Chip'

  const today = new Date()

  export default {
    components: {
      ImportExport,
      ClearList,
      OrderBy,
      OnePerson,
      Chip,
    },
    data: () => ({
      showAdminActions: false,
      selectedOrder: 'daysUntilBirthday',
      selectedGroups: [],
    }),
    computed: {
      ...mapGetters(['importantPersons', 'groups']),
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
    created() {
      this.selectedOrder = this.getOrderFromLocalStorage() || 'daysUntilBirthday'
    },
    methods: {
      getOrderFromLocalStorage() {
        return localStorageHelper.getListOrder()
      },
      buildPersons(serverPersons) {
        return (
          serverPersons &&
          Object.values(serverPersons).map(person => {
            return {
              id: person.id,
              name: person.name,
              birthday: new Date(person.birthday),
              age: computeAge(new Date(), new Date(person.birthday)),
              daysUntilBirthday: this.daysUntilBirthday(person.birthday),
              groups: person.groups && person.groups.sort(),
            }
          })
        )
      },
      daysUntilBirthday(birthday) {
        let nextBirthday
        if (typeof birthday === 'string') {
          nextBirthday = new Date(birthday)
        } else {
          nextBirthday = new Date(birthday.getTime())
        }
        nextBirthday.setFullYear(today.getFullYear())
        if (
          this.isDayMonthLater(
            { day1: nextBirthday.getDate(), month1: nextBirthday.getMonth() },
            { day2: today.getDate(), month2: today.getMonth() }
          )
        ) {
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
        localStorageHelper.saveListOrder(order)
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
    },
  }
</script>

<style scoped lang="scss">
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
  }

  .flip-list-item {
    transition: all 0.5s;
    display: inline-block;
  }
  .flip-list-move {
    transition: transform 0.8s;
  }
  .flip-list-enter,
  .flip-list-leave-to {
    opacity: 0;
  }
  .flip-list-leave-active {
    position: absolute;
  }

  .persons-grid {
    @apply mt-5;
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
