// npm t __tests__/ImportantPersons.spec

import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useAppStore } from '@/store/app/app.store.ts'
import ImportantPersons from '../ImportantPersons.vue'

describe('ImportantPersons component', () => {
  describe('nbPersonsWithinGroup()', () => {
    it("should answer that 2 people are in the 'Friends' group", () => {
      // --- GIVEN
      const wrapper = mount(ImportantPersons, {
        shallow: true,
        global: {
          plugins: [createTestingPinia()],
        },
      })

      const appStore = useAppStore()
      appStore.importantPersons = [
        {
          id: '123',
          name: 'Franck',
          birthday: new Date('2000-05-01'),
          groups: ['Friends'],
        },
        {
          id: '456',
          name: 'Sophie',
          birthday: new Date('1998-03-15'),
          groups: ['Friends'],
        },
      ]
      appStore.groups = ['Friends']

      // --- WHEN
      const nbPersons = wrapper.vm.nbPersonsWithinGroup('Friends')

      // --- THEN
      expect(nbPersons).toBe(2)
    })
  })
})
