// npm t PersonGroups.spec

import { mount } from '@vue/test-utils'
import { beforeEach } from 'vitest'
import PersonGroups from '../PersonGroups.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAppStore } from '@/store/app/app.store'

describe('PersonGroups component', function () {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(PersonGroups, {
      global: {
        plugins: [createTestingPinia()],
      },
      props: {
        personId: '123',
        personGroups: ['Friends', '🎓 University'],
        isEditMode: false,
      },
    })
    const appStore = useAppStore()
    appStore.groups = ['Friends', 'Family', '🎭 Theater', '🎓 University']
  })

  describe('hasGroups', function () {
    it('should say yes', function () {
      expect(wrapper.vm.hasGroups).toBe(true)
    })
  })

  describe('otherGroups', function () {
    it('should give other possible groups', function () {
      expect(wrapper.vm.otherGroups).toEqual(['Family', '🎭 Theater'])
    })
  })
})
