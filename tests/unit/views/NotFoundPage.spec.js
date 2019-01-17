import { shallowMount } from '@vue/test-utils'
import NotFoundPage from '@/views/NotFoundPage.vue'
// NOTHING TO TEST YET, mostly just a place holder
describe('NotFoundPage.vue', () => {
  it('renders not found page', () => {
    const wrapper = shallowMount(NotFoundPage)
    expect(wrapper.text()).toMatch('404 This page was not found!')
  })
})
