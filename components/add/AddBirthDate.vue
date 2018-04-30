<template>
  <form class="add-person">
    <div class="md">
      <v-text-field
        name="name"
        ref="name"
        placeholder="Name"
        v-model="name"
      ></v-text-field>
    </div>

    <div class="xs pt-0">
      <v-text-field
        name="day"
        placeholder="DD"
        v-model="day"
        class="pt-0"
      ></v-text-field>
    </div>

    <div class="month">
      <select-month
        v-for="(month, index) in months"
        :key="month"
        :monthIndex="index"
        :monthLabel="month"
        :selected="monthNo === index"
        @select="selectMonth($event)"
      ></select-month>
    </div>

    <div class="years-wrap">
      <div class="year">
        <div class="year-prefix">
          19
        </div>
        <v-text-field
          name="year1"
          ref="year1"
          placeholder="YY"
          v-model="year1"
          maxlength="2"
        ></v-text-field>
      </div>

      <div class="year">
        <div class="year-prefix">
          20
        </div>
        <v-text-field
          name="year2"
          ref="year2"
          placeholder="YY"
          v-model="year2"
          maxlength="2"
        ></v-text-field>
      </div>
    </div>

    <div>
      <v-btn color="primary" type="submit" @click.prevent="addBirthDate()">
        Add
      </v-btn>
    </div>
  </form>
</template>

<script>
  import SelectMonth from './SelectMonth.vue'

  export default {
    components: {
      SelectMonth,
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
      }
    },
    mounted() {
      this.focusNameInput()
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
          name: this.name,
          day: this.day,
          monthNo: this.monthNo,
          monthLabel: this.months[this.monthNo],
          year,
          birthday,
        })
        this.resetForm()
        this.focusNameInput()
      },
      getYear(year1, year2) {
        return year1 && parseInt(`19${year1}`, 10) ||
          year2 && parseInt(`20${year2}`, 10)
      },
      resetForm() {
        this.name = ''
        this.day = ''
        this.monthNo = ''
        this.monthLabel = ''
        this.year1 = ''
        this.year2 = ''
      },
      focusNameInput() {
        this.$nextTick(() => this.$refs.name.focus())
      },
      focusYear1Input() {
        this.$nextTick(() => this.$refs.year1.focus())
      },
    }
  }
</script>

<style scoped lang="scss">
  .add-person {
    display: flex;
    flex-direction: column;
    align-items: center;

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
  }
</style>
