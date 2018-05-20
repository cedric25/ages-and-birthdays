import Vue from 'vue'
import Vuex from 'vuex'
import { shallowMount } from '@vue/test-utils'
import OnePerson from '@/components/list/OnePerson.vue'

Vue.use(Vuex)

describe('OnePerson component', () => {

  test('renders props.msg when passed', () => {
    const person = {
      id: '123',
      name: 'Cédric',
      birthday: new Date('1988-02-25'),
      age: 30,
      daysUntilBirthday: 295,
      groups: ['Family'],
    }
    const wrapper = shallowMount(OnePerson, {
      propsData: { person }
    })
    expect(wrapper.vm.$el.querySelector('h3').textContent.trim()).toBe('Cédric')
  })

  test('renders props.msg when passed', () => {
    const person = {
      id: '123',
      name: 'Cédric',
      birthday: new Date('1988-02-25'),
      age: 30,
      daysUntilBirthday: 295,
      groups: ['Family'],
    }
    const wrapper = shallowMount(OnePerson, {
      propsData: { person },
      store: new Vuex.Store({
        state: {
          importantPersons: [],
          groups: ['Family', 'Friends'],
        }
      }),
    })

    console.log('wrapper', wrapper.vm.$store.state.groups)

    expect(wrapper.vm.$el.querySelector('h3').textContent.trim()).toBe('Cédric')
  })

})
