<template>
  <div class="mt-0 md:mt-6">
    <div class="admin-actions mb-2 px-2" v-if="showAdminActions">
      <!--      <ImportExport />-->

      <div v-if="importantPersons.length > 0" class="ml-3">
        <ClearList />
      </div>
    </div>

    <div v-if="importantPersons.length > 0">
      <div class="order-and-total">
        <OrderBy
          class="flex-1"
          :selected-order="selectedOrder"
          @order="selectOrder"
        />

        <div class="total-persons">
          <strong>{{ importantPersons.length }}</strong> important person{{
            importantPersons.length > 1 ? 's' : ''
          }}
        </div>
      </div>

      <div class="mt-2 md:mt-0">
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
          @wantToDelete="askForConfirmation"
        />
      </div>
    </transition-group>

    <ConfirmDeleteModal
      :show-modal="showConfirmDeleteModal"
      :person-id="personIdToDelete"
      :person-name="personNameToDelete"
      @confirm="confirmDeletePerson"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import { computeAge } from '../../helpers/computeAge'
import comparePersons from '../../helpers/comparePersons'
import * as localStorageHelper from '../../services/localStorage/localStorageHelper.js'
import * as importantPersons from '../../helpers/importantPersons'

const today = new Date()

export default {
  data: () => ({
    showAdminActions: false,
    selectedOrder: 'daysUntilBirthday',
    selectedGroups: [],
    showConfirmDeleteModal: 0,
    personIdToDelete: '',
    personNameToDelete: '',
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
        return personsList.sort((p1, p2) =>
          comparePersons(p1, p2, selectedOrder)
        )
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
    askForConfirmation({ id, name }) {
      this.personIdToDelete = id
      this.personNameToDelete = name
      this.showConfirmDeleteModal++
    },
    confirmDeletePerson(personId) {
      importantPersons.deletePerson(this.$store, personId)
    },
  },
}
</script>

<style scoped lang="scss">
.order-and-total {
  @apply flex flex-col-reverse;
  @apply p-2;

  .total-persons {
    @apply mb-3 pr-2 text-right;
  }

  @media (min-width: 675px) {
    @apply flex-row;
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
  @apply grid grid-cols-1 gap-6;
  grid-template-columns: 1fr;
  justify-items: center;

  .one-person {
    width: 300px;
  }
}
@media (min-width: 665px) {
  .persons-grid {
    @apply grid grid-cols-2;

    .one-person {
      width: 300px;
    }
  }
}
@media (min-width: 768px) {
  .persons-grid .one-person {
    width: 350px;
  }
}
@media (min-width: 1065px) {
  .persons-grid {
    @apply grid grid-cols-3;

    .one-person {
      width: 300px;
    }
  }
}
@media (min-width: 1265px) {
  .persons-grid .one-person {
    width: 350px;
  }
}
</style>
