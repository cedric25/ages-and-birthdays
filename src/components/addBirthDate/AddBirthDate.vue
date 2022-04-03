<template>
  <form class="flex flex-col items-center">
    <ConfirmationToast
      :show-confirmation="showConfirmation"
      :added-name="addedName"
    />

    <div class="name-input mb-6">
      <input
        ref="name"
        v-model="name"
        name="name"
        placeholder="Name"
        class="input text-center"
      />
    </div>

    <div class="mb-2 flex flex-wrap justify-center">
      <Chip
        v-for="group in groups"
        :key="group"
        :selected="isGroupSelected(group)"
        clickable
        class="mr-2 mb-2"
        tabindex="0"
        @click.native="selectGroup(group)"
        @keyup.native.enter="selectGroup(group)"
        @keydown.native.space.prevent="selectGroup(group)"
        >{{ group }}</Chip
      >
    </div>

    <div class="mb-6">
      <AddGroup />
    </div>

    <div class="mb-6">
      <input
        type="tel"
        ref="day"
        v-model="day"
        name="day"
        placeholder="DD"
        class="input text-center"
        style="width: 30px"
      />
    </div>

    <div class="mb-6 grid grid-cols-6 gap-x-1 gap-y-2">
      <Chip
        v-for="(month, index) in months"
        :key="month"
        :selected="monthNo === index"
        clickable
        tabindex="0"
        @click.native="selectMonth(index)"
        @keyup.native.enter="selectMonth(index)"
        @keydown.native.space.prevent="selectMonth(index)"
        >{{ month }}</Chip
      >
    </div>

    <div class="mb-6 flex">
      <div class="mr-4 flex">
        <div class="tracking-wider">19</div>
        <div style="width: 24px">
          <input
            type="tel"
            ref="year1"
            name="year1"
            v-model="year1"
            :disabled="!!year2"
            placeholder="YY"
            maxlength="2"
            class="input tracking-widest"
            style="width: 24px; margin-left: 1px"
          />
        </div>
      </div>

      <div class="mx-2">OR</div>

      <div class="ml-4 flex">
        <div class="tracking-wider">20</div>
        <div style="width: 24px">
          <input
            type="tel"
            ref="year2"
            name="year2"
            v-model="year2"
            :disabled="!!year1"
            placeholder="YY"
            maxlength="2"
            class="input tracking-widest"
            style="width: 24px; margin-left: 1px"
          />
        </div>
      </div>
    </div>

    <div>
      <button
        :disabled="!isFormValid"
        type="submit"
        class="btn btn-blue"
        @click.prevent="addBirthDate()"
      >
        Add
      </button>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import { nanoid } from 'nanoid'
import * as importantPersons from '../../helpers/importantPersons'

export default {
  name: 'AddBirthDate',
  props: {
    isBirthdayFormOpen: { type: Boolean, required: true },
  },
  data: () => ({
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
    addedName: 'Tom',
  }),
  computed: {
    ...mapGetters(['importantPersons', 'groups']),
    isFormValid() {
      return this.name && this.day && this.monthNo !== -1
    },
  },
  watch: {
    isBirthdayFormOpen: {
      handler(isExpanded) {
        if (isExpanded) {
          setTimeout(() => {
            this.focusNameInputDelay()
          }, 100)
        }
      },
      immediate: true,
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
      const birthday = new Date(Date.UTC(year, month, day)).toISOString()
      const newPerson = {
        id: nanoid(),
        name: this.name,
        birthday,
        groups: this.selectedGroups,
      }
      importantPersons.addNewPerson(this.$store, newPerson)
      this.addedName = this.name
      this.showConfirmation = true
      setTimeout(() => {
        document.getElementById('footertoast').click()
        setTimeout(() => (this.showConfirmation = false), 1000)
      }, 2000)
      this.resetForm()
      this.focusNameInput()
    },
    getYear(year1, year2) {
      return (
        (year1 && parseInt(`19${year1}`, 10)) ||
        (year2 && parseInt(`20${year2}`, 10)) ||
        1900
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
        this.selectedGroups = this.selectedGroups.filter(
          group => group !== groupLabel
        )
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
