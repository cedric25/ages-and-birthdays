<template>
  <form class="add-person">
    <div>
      <input type="text" placeholder="Name" v-model="name" ref="name" />
    </div>

    <div>
      <input type="text" placeholder="DD" v-model="day" />
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
    <div>
      19<input type="text" placeholder="YY" v-model="year1" ref="year1" maxlength="2" />
    </div>
    <div>
      20<input type="text" placeholder="YY" v-model="year2" maxlength="2" />
    </div>

    <div>
      <button type="submit" @click.prevent="addBirthDate()">
        Add
      </button>
    </div>
  </form>
</template>

<script>
  import SelectMonth from '~/components/SelectMonth.vue'

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
    created() {
      // this.injectTestData()
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
      injectTestData() {
        this.$store.commit('addNewImportantPerson', {
          name: 'Agathe',
          day: '23',
          monthNo: 2,
          monthLabel: 'feb',
          year: '2000',
        })
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

    .month {
      justify-content: center;
      display: flex;
      flex-direction: row;

      > div {
        display: flex;
        flex-direction: column;
      }

      .chip--selected {
        box-shadow: none;
        border-color: rgba(255, 0, 0, .13) !important;

        &::after {
          background: red;
        }
      }
    }
  }
</style>
