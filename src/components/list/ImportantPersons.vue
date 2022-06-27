<template>
  <div class="mt-0 md:mt-6">
    <!-- ----- ADMIN ----- -->
    <div class="admin-actions mb-2 px-2" v-if="showAdminActions">
      <!--      <ImportExport />-->

      <div v-if="importantPersons.length > 0" class="ml-3">
        <ClearList />
      </div>
    </div>
    <!-- ----- ADMIN ----- -->

    <div>
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

    <button
      v-if="!isSyncingDb && importantPersons.length === 0"
      class="mt-6 w-[400px] rounded-xl border border-[3px] border-dashed bg-white px-2 py-10"
    >
      <span class="block text-3xl">🎂</span>
      <span class="mt-1 block text-lg">Add your first person's birthday</span>
    </button>

    <transition-group v-else name="flip-list" tag="div" class="persons-grid">
      <div v-for="person in persons" :key="person.id" class="flip-list-item">
        <OnePerson :person="person" @wantToDelete="askForConfirmation" />
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
import { mapState } from 'pinia'
import { useAppStore } from '@/store/app/app.store.ts'
import * as localStorageHelper from '@/services/localStorage/localStorageHelper.js'
import { computeAge } from '@/helpers/computeAge.js'
import { daysUntilBirthday } from '@/helpers/daysUntilBirthday.ts'
import { comparePersons } from '@/helpers/comparePersons.js'
import * as importantPersons from '@/helpers/importantPersons.ts'

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
    ...mapState(useAppStore, ['importantPersons', 'isSyncingDb']),
    ...mapState(useAppStore, { groups: 'sortedGroups' }),
    personsList() {
      return this.buildPersons(this.importantPersons)
    },
    persons() {
      if (this.selectedGroups.length === 0) {
        return this.sortPersons(this.personsList, this.selectedOrder)
      }
      // Apply filters
      const filteredPersonsList = this.personsList.filter(person => {
        const commonGroups = this.selectedGroups.filter(group => {
          return person.groups && person.groups.includes(group)
        })
        return commonGroups.length > 0
      })
      return this.sortPersons(filteredPersonsList, this.selectedOrder)
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
            birthday: person.birthday,
            age: computeAge(new Date(), person.birthday),
            daysUntilBirthday: daysUntilBirthday(person.birthday),
            groups: person.groups && person.groups.sort(),
            ...(person.parentOne && { parentOne: person.parentOne }),
            ...(person.parentTwo && { parentTwo: person.parentTwo }),
          }
        })
      )
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
      importantPersons.deletePerson(personId)
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
