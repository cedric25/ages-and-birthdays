<template>

    <v-expansion-panel popout>
      <v-expansion-panel-content
        :value="importantPersons.length === 0"
        @input="focusNameInputDelay()"
      >
        <div slot="header">
          <span v-if="importantPersons.length > 0">
            Add someone's birthday
          </span>
          <span v-else>
            Add your first person's birthday to the list
          </span>
        </div>
        <v-card>
          <v-card-text>

            <form class="add-person">
              <div class="md">
                <v-text-field
                  name="name"
                  ref="name"
                  placeholder="Name"
                  v-model="name"
                  class="name-input"
                ></v-text-field>
              </div>

              <div class="group-choice">
                <v-chip
                  v-for="group in groups" :key="group"
                  color="secondary"
                  text-color="white"
                  class="blue-chip"
                  :selected="selectedGroup === group"
                  @click="selectGroup(group)"
                  @keyup.enter="selectGroup(group)"
                >
                  {{ group }}
                </v-chip>
                <div class="add-group-form">
                  <v-text-field
                    name="group"
                    placeholder="Add new..."
                    v-model="newGroup"
                    class="pt-0"
                    @keyup.enter="addGroup()"
                  ></v-text-field>
                  <v-btn color="accent" @click.prevent="addGroup()" :disabled="!newGroup">
                    Add group
                  </v-btn>
                </div>
              </div>

              <div class="xs pt-0">
                <v-text-field
                  name="day"
                  ref="day"
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
                <v-btn
                  type="submit"
                  color="primary"
                  @click.prevent="addBirthDate()"
                  :disabled="!isFormValid"
                >
                  Add
                </v-btn>
              </div>
            </form>

          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

</template>

<script>
  import { mapGetters } from 'vuex'
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
        selectedGroup: null,
        newGroup: '',
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
          group: this.selectedGroup || undefined,
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
        this.selectedGroup = ''
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
        if (groupLabel === this.selectedGroup) {
          this.selectedGroup = null
        } else {
          this.selectedGroup = groupLabel
          this.$nextTick(() => this.$refs.day.focus())
        }
      },
      addGroup() {
        if (this.groups.indexOf(this.newGroup) === -1) {
          this.$store.commit('addGroup', this.newGroup)
          this.selectedGroup = this.newGroup
          this.newGroup = ''
          this.$nextTick(() => this.$refs.day.focus())
        }
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

    .name-input /deep/ input {
      text-align: center;
    }

    .group-choice {
      text-align: center;

      .add-group-form {
        display: flex;
        align-items: baseline;
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
