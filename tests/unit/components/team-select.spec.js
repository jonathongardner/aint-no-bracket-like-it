import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import TeamSelect from '@/components/bracket/team-select.vue'

describe('team-select.vue', () => {
  it('should not show team box if no team passed', () => {
    const wrapper = shallowMount(TeamSelect, {
      propsData: {
        team: {},
        value: '',
        type: 'cool',
        available: true,
      }
    })
    expect(wrapper.find('.team-n-rank').exists()).toBe(false)
    expect(wrapper.find('.icon').exists()).toBe(false)
  })
  it('should show empty circle if team passed and available', () => {
    const wrapper = shallowMount(TeamSelect, {
      propsData: {
        team: {name: 'coolo', rank: 5},
        value: '',
        type: 'cool',
        available: true,
      }
    })
    expect(wrapper.find('.team-n-rank').exists()).toBe(true)
    expect(wrapper.find('.icon').exists()).toBe(true)
    expect(wrapper.find('.fa-check-circle').exists()).toBe(false)
    expect(wrapper.find('.fa-ban').exists()).toBe(false)
    expect(wrapper.find('.fa-circle').exists()).toBe(true)
  })
  it('should show empty circle if winner and not available', () => {
    const wrapper = shallowMount(TeamSelect, {
      propsData: {
        team: {name: 'coolo', rank: 5},
        value: 'coolo',
        type: 'cool',
        available: false,
      }
    })
    expect(wrapper.find('.team-n-rank').exists()).toBe(true)
    expect(wrapper.find('.icon').exists()).toBe(true)
    expect(wrapper.find('.fa-check-circle').exists()).toBe(false)
    expect(wrapper.find('.fa-ban').exists()).toBe(false)
    expect(wrapper.find('.fa-circle').exists()).toBe(true)
  })
  it('should show check box if team passed is chosen', () => {
    const wrapper = shallowMount(TeamSelect, {
      propsData: {
        team: {name: 'coolo', rank: 5},
        value: 'cool',
        type: 'cool',
        available: true,
      }
    })
    expect(wrapper.find('.team-n-rank').exists()).toBe(true)
    expect(wrapper.find('.icon').exists()).toBe(true)
    expect(wrapper.find('.fa-check-circle').exists()).toBe(true)
    expect(wrapper.find('.fa-ban').exists()).toBe(false)
    expect(wrapper.find('.fa-circle').exists()).toBe(false)
  })
  it('should show ban if no winner and not available', () => {
    const wrapper = shallowMount(TeamSelect, {
      propsData: {
        team: {name: 'coolo', rank: 5},
        value: '',
        type: 'cool',
        available: false,
      }
    })
    expect(wrapper.find('.team-n-rank').exists()).toBe(true)
    expect(wrapper.find('.icon').exists()).toBe(true)
    expect(wrapper.find('.fa-check-circle').exists()).toBe(false)
    expect(wrapper.find('.fa-ban').exists()).toBe(true)
    expect(wrapper.find('.fa-circle').exists()).toBe(false)
  })
  it('should emit winner if clicked', () => {
    const wrapper = shallowMount(TeamSelect, {
      propsData: {
        team: {name: 'coolo', rank: 5},
        value: '',
        type: 'cool',
        available: false,
      }
    })
    wrapper.trigger('click')
    wrapper.vm.$emit('input', 'cool')
  })
  it('should emit winner empty if winner is clicked', () => {
    const wrapper = shallowMount(TeamSelect, {
      propsData: {
        team: {name: 'coolo', rank: 5},
        value: 'cool',
        type: 'cool',
        available: false,
      }
    })
    wrapper.trigger('click')
    wrapper.vm.$emit('input', '')
  })
})
