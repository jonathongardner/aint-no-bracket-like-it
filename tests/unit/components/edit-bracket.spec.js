import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import EditBracket from '@/components/edit-bracket.vue'
import TeamSelect from '@/components/bracket/team-select.vue'

describe('edit-bracket.vue', () => {
  it('should emit if team-select is clicked', () => {
    const wrapper = mount(EditBracket, {
      propsData: {
        intialGames: {1: {topTeam: {name: 'cool', rank: 1}, bottomTeam: {name: 'cooler', rank: 2} } },
        value: {},
        gameAvailability: {1: ['top', 'bottom']},
      }
    })
    const ts = wrapper.findAll(TeamSelect)
    ts.at(0).trigger('click')
    wrapper.vm.$emit('input', {1: {winner: 'top'}})
  })
})
