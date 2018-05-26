<template>

  <form class="add-person">
    <div class="md">
      <v-text-field
        ref="name"
        v-model="name"
        name="name"
        placeholder="Name"
        class="name-input"
      />
    </div>

    <div class="group-choice">
      <v-chip
        v-for="group in groups"
        :key="group"
        :selected="isGroupSelected(group)"
        color="secondary"
        text-color="white"
        class="blue-chip"
        @click="selectGroup(group)"
        @keyup.enter="selectGroup(group)"
      >
        {{ group }}
      </v-chip>

    </div>

    <div>
      <ad-add-group />
    </div>

    <div class="xs pt-0">
      <v-text-field
        ref="day"
        v-model="day"
        name="day"
        placeholder="DD"
      />
    </div>

    <div class="month">
      <select-month
        v-for="(month, index) in months"
        :key="month"
        :month-index="index"
        :month-label="month"
        :selected="monthNo === index"
        @select="selectMonth($event)"
      />
    </div>

    <div class="years-wrap">
      <div class="year">
        <div class="year-prefix">
          19
        </div>
        <v-text-field
          ref="year1"
          v-model="year1"
          name="year1"
          placeholder="YY"
          maxlength="2"
        />
      </div>

      <div class="year">
        <div class="year-prefix">
          20
        </div>
        <v-text-field
          ref="year2"
          v-model="year2"
          name="year2"
          placeholder="YY"
          maxlength="2"
        />
      </div>
    </div>

    <div>
      <v-btn
        :disabled="!isFormValid"
        type="submit"
        color="primary"
        @click.prevent="addBirthDate()"
      >
        Add
      </v-btn>
    </div>
  </form>

</template>

<script>
import { mapGetters } from 'vuex'
import uuid from 'uuid/v4'
import AddGroup from './AddGroup'
import SelectMonth from './SelectMonth.vue'

export default {
  name: 'AddBirthDate',
  components: {
    'ad-add-group': AddGroup,
    SelectMonth,
  },
  props: {
    isBirthdayFormOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      name: '',
      day: '',
      monthNo: -1,
      monthLabel: '',
      year1: '',
      year2: '',
      selectedGroups: [],
    }
  },
  computed: {
    ...mapGetters([
      'importantPersons',
      'groups',
    ]),
    isFormValid() {
      return this.name &&
        this.day &&
        this.monthNo !== -1 &&
        (this.year1.length === 2 || this.year2.length === 2)
    },
  },
  watch: {
    isBirthdayFormOpen(value) {
      value && this.focusNameInputDelay()
    },
  },
  methods: {
    selectMonth(monthNo) {
      this.monthNo = monthNo
      this.focusYear1Input()
    },
    addBirthDate() {
      const year = this.getYear(this.year1, this.year2)
      const month = this.monthNo
      const day = parseInt(this.day, 10)
      const birthday = new Date(year, month, day)
      this.$store.commit('addNewImportantPerson', {
        id: uuid(),
        name: this.name,
        birthday,
        groups: this.selectedGroups,
      })
      this.resetForm()
      this.focusNameInput()
    },
    getYear(year1, year2) {
      return (year1 && parseInt(`19${year1}`, 10)) ||
        (year2 && parseInt(`20${year2}`, 10))
    },
    resetForm() {
      this.name = ''
      this.selectedGroups = []
      this.day = ''
      this.monthNo = ''
      this.monthLabel = ''
      this.year1 = ''
      this.year2 = ''
    },
    focusNameInput() {
      this.$nextTick(() => this.$refs.name.focus())
    },
    focusNameInputDelay() {
      setTimeout(() => this.$refs.name.focus(), 300)
    },
    focusYear1Input() {
      this.$nextTick(() => this.$refs.year1.focus())
    },
    selectGroup(groupLabel) {
      if (this.selectedGroups.includes(groupLabel)) {
        this.selectedGroups = this.selectedGroups.filter(group => group !== groupLabel)
      } else {
        this.selectedGroups.push(groupLabel)
      }
    },
    isGroupSelected(groupLabel) {
      return this.selectedGroups.includes(groupLabel)
    },
  }
}
</script>

<style scoped lang="scss">
  .add-person {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 25px 25px;

    .md {
      max-width: 175px;
    }

    .xs {
      /deep/ input {
        letter-spacing: 2px;
        max-width: 30px;
        text-align: center;
      }
    }

    .name-input /deep/ input {
      text-align: center;
    }

    .group-choice {
      text-align: center;
    }

    .years-wrap {
      display: flex;
      align-content: space-around;

      .year {
        display: flex;
        align-items: center;

        &:first-child {
          margin-right: 50px;
        }

        .year-prefix {
          top: -4px;
          position: relative;
          margin-right: 3px;
        }

        /deep/ input {
          letter-spacing: 2px;
          max-width: 24px;
        }
      }
    }

    .month {
      justify-content: center;
      display: flex;
      flex-direction: row;

      .chip:focus {
        background-color: #555 !important;
      }

      > span /deep/ span {
        cursor: pointer;
      }

      .chip--selected {
        box-shadow: none;
        border-color: rgb(25, 118, 210) !important;

        &::after {
          background: rgb(25, 118, 210);
          opacity: 1;
        }
      }
    }

    .blue-chip {
      /deep/ span {
        cursor: pointer;
      }

      &:focus {
        background-color: #555 !important;
      }

      &.chip--selected {
        box-shadow: none;
        border-color: rgb(25, 118, 210) !important;

        &::after {
          background: rgb(25, 118, 210);
          opacity: 1;
        }
      }
    }
  }
</style>
