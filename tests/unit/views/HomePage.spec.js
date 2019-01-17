import { shallowMount } from '@vue/test-utils'
import HomePage from '@/views/HomePage.vue'
// NOTHING TO TEST YET, mostly just a place holder
describe('HomePage.vue', () => {
  it('renders home page', () => {
    const wrapper = shallowMount(HomePage)
    expect(wrapper.text()).toMatch('Are you tired of picking March Madness Brackets')
  })
})
