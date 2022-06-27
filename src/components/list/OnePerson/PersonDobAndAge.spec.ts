// npm t PersonDobAndAge.spec

import { mount } from '@vue/test-utils'
import PersonDobAndAge from './PersonDobAndAge.vue'

describe('PersonDobAndAge component', () => {
  describe('when giving 30 years of age', function () {
    it('should give the proper object result', function () {
      // --- GIVEN
      const wrapper = mount(PersonDobAndAge, {
        props: {
          personId: '123',
        },
      })

      // --- WHEN

      // --- THEN
      expect()
    })
  })
})
