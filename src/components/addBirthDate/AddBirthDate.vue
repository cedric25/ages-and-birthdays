<template>
  <form class="add-person">
    <div class="name-input md">
      <input ref="name" v-model="name" name="name" placeholder="Name" class="ipt text-center" />
    </div>

    <div class="group-choice">
      <v-chip
        v-for="group in groups"
        :key="group"
        :color="isGroupSelected(group) ? 'primary' : 'secondary'"
        :ripple="false"
        class="mr-2 mb-2"
        tabindex="0"
        @click="selectGroup(group)"
        @keyup.enter="selectGroup(group)"
        @keydown.space.prevent="selectGroup(group)"
      >
        {{ group }}
      </v-chip>
    </div>

    <div>
      <AddGroup />
    </div>

    <div>
      <input
        type="tel"
        ref="day"
        v-model="day"
        name="day"
        placeholder="DD"
        class="ipt text-center"
        style="width: 30px;"
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
        <div style="width: 24px;">
          <input
            type="tel"
            ref="year1"
            v-model="year1"
            :disabled="!!year2"
            name="year1"
            placeholder="YY"
            maxlength="2"
          />
        </div>
      </div>

      <div class="year">
        <div class="year-prefix">
          20
        </div>
        <div style="width: 24px;">
          <input
            type="tel"
            ref="year2"
            v-model="year2"
            :disabled="!!year1"
            name="year2"
            placeholder="YY"
            maxlength="2"
          />
        </div>
      </div>
    </div>

    <div>
      <button
        :disabled="!isFormValid"
        type="submit"
        color="primary"
        @click.prevent="addBirthDate()"
      >
        Add
      </button>
    </div>

    <v-alert :value="showConfirmation" type="success" class="success-alert text-left mt-6">
      You've added <strong>{{ addedName }}</strong
      >!
    </v-alert>
  </form>
</template>

<script>
  import { mapGetters } from 'vuex'
  import uuid from 'uuid/v4'
  import * as importantPersons from '../../helpers/importantPersons'
  import AddGroup from '../manageGroups/AddGroup.vue'
  import SelectMonth from './SelectMonth.vue'

  export default {
    name: 'AddBirthDate',
    components: {
      AddGroup,
      SelectMonth,
    },
    props: {
      isBirthdayFormOpen: { type: Boolean, required: true },
    },
    data() {
      return {
        months: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        name: '',
        day: '',
        monthNo: -1,
        monthLabel: '',
        year1: '',
        year2: '',
        selectedGroups: [],
        showConfirmation: false,
        addedName: '',
      }
    },
    computed: {
      ...mapGetters(['importantPersons', 'groups']),
      isFormValid() {
        return this.name && this.day && this.monthNo !== -1
      },
    },
    created() {
      if (this.isBirthdayFormOpen) {
        this.focusNameInputDelay()
      }
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
        const birthday = new Date(Date.UTC(year, month, day))
        const newPerson = {
          id: uuid(),
          name: this.name,
          birthday,
          groups: this.selectedGroups,
        }
        importantPersons.addNewPerson(this.$store, newPerson)
        this.addedName = this.name
        this.showConfirmation = true
        setTimeout(() => {
          this.showConfirmation = false
        }, 2000)
        this.resetForm()
        this.focusNameInput()
      },
      getYear(year1, year2) {
        return (
          (year1 && parseInt(`19${year1}`, 10)) || (year2 && parseInt(`20${year2}`, 10)) || 1900
        )
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
    },
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
      > input {
        letter-spacing: 2px;
        max-width: 30px;
        text-align: center;
      }
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
          font-size: 16px;
          top: -4px;
          position: relative;
          margin-right: 3px;
        }
      }
    }

    .month {
      text-align: center;
      display: grid;
      grid-template-columns: repeat(4, 1fr);

      .chip {
        justify-content: center;

        &:focus {
          background-color: #555 !important;
        }

        > .chip__content {
          cursor: pointer;
        }
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

    @media (min-width: 450px) {
      .month {
        grid-template-columns: repeat(6, 1fr);
      }
    }
  }

  .success-alert {
    width: 100%;
  }
</style>

<style>
  .group-choice .v-chip,
  .month .v-chip {
    box-sizing: border-box;
    border: 2px solid #b0bec5 !important;
  }

  .theme--light.v-chip:focus {
    background-color: #8e989e !important;
    border: 2px solid #1976d2 !important;
  }

  .theme--light.v-chip.primary:focus {
    background-color: #1976d2 !important;
    border: 2px solid #b0bec5 !important;
  }

  .years-wrap input {
    padding-bottom: 4px;
    padding-top: 2px;
    letter-spacing: 2px;
  }
</style>
