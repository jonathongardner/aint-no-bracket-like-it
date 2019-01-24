import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import EditMatchUp from '@/components/bracket/edit-match-up.vue'
import TeamSelect from '@/components/bracket/team-select.vue'

describe('edit-match-up.vue', () => {
  it('should emit if team-select is clicked', () => {
    const wrapper = shallowMount(EditMatchUp, {
      propsData: {
        game: {topTeam: {name: 'cool', rank: 1}, bottomTeam: {name: 'cooler', rank: 2}},
        value: '',
        availability: ['top', 'bottom'],
      }
    })
    const ts = wrapper.findAll(TeamSelect)
    ts.at(0).trigger('click')
    wrapper.vm.$emit('input', 'top')
  })
})
