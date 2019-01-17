import { shallowMount } from '@vue/test-utils'
import AboutPage from '@/views/AboutPage.vue'
// NOTHING TO TEST YET, mostly just a place holder
describe('AboutPage.vue', () => {
  it('renders about page', () => {
    const wrapper = shallowMount(AboutPage)
    expect(wrapper.text()).toMatch('This is an about page')
  })
})
