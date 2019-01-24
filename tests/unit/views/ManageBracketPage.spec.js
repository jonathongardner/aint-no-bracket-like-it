import { shallowMount, mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import ManageBracketPage from '@/views/ManageBracketPage.vue'
// import EditBracket from '@/components/edit-bracket.vue'
import TeamSelect from '@/components/bracket/team-select.vue'
import {bracketApi, saveBracketApi} from '@/helpers/api.js'
import bracketOptions from '@/helpers/bracketOptions.js'
import {initialBracket} from '../data.js'

describe('ManageBracketPage.vue', () => {
  const getInitialBracketMock = jest.spyOn(bracketApi, "getInitialBracket")
  const createBracketMock = jest.spyOn(saveBracketApi, "createBracket")
  const updateBracketMock = jest.spyOn(saveBracketApi, "updateBracket")
  const savedBracketMock = jest.spyOn(saveBracketApi, "savedBracket")
  const toastedSaved = jest.fn()
  function setWrapper(options = {}) {
    const wrapper = shallowMount(ManageBracketPage, {
      mocks: {
        $route: { params: {} },
        $toasted: {
          global: {
            saved: toastedSaved
          }
        }
      },
      ...options,
    })
    wrapper.setData({initialGames: initialBracket})
    expect(getInitialBracketMock).toHaveBeenCalledWith(bracketOptions.lastYear)
    return wrapper
  }

  afterEach(() => {
    getInitialBracketMock.mockClear()
    createBracketMock.mockClear()
    updateBracketMock.mockClear()
    savedBracketMock.mockClear()
    toastedSaved.mockClear()
  })
  it('should create bracket if no id', () => {
    const wrapper = setWrapper()
    expect(savedBracketMock).not.toHaveBeenCalled()
    wrapper.find('input[type="text"]').setValue('Coolo')
    wrapper.find('button').trigger('click')
    expect(createBracketMock).toHaveBeenCalled()
    expect(updateBracketMock).not.toHaveBeenCalled()
  })
  it('should update bracket if id', () => {
    const wrapper = setWrapper({
      mocks: {$route: { params: {id: 1, bracket: {name: 'Coolo', games: {}, isUnique: false} } } },
    })
    expect(savedBracketMock).not.toHaveBeenCalled() // dont call since we already have name (and should also have game)

    wrapper.find('input[type="text"]').setValue('Coolo')
    wrapper.find('button').trigger('click')

    expect(createBracketMock).not.toHaveBeenCalled()
    expect(updateBracketMock).toHaveBeenCalled()
  })
  it('should request bracket if no name (and game) arent passed', () => {
    const wrapper = setWrapper({ mocks: {$route: { params: {id: 1} } } })
    expect(savedBracketMock).toHaveBeenCalled()
  })
  it('should set id on saved bracket', async () => {
    const manageBracket = jest.fn(() => {
      return Promise.resolve({id: 1})
    })
    const wrapper = setWrapper({ methods: {manageBracket} })
    wrapper.setData({responseError: Error('Some Error')})

    expect(wrapper.vm.id).toEqual(undefined)

    wrapper.find('button').trigger('click')

    expect(wrapper.vm.responseError).toEqual(null)

    await flushPromises()

    expect(manageBracket).toHaveBeenCalled()
    expect(toastedSaved).toHaveBeenCalled()
    expect(wrapper.vm.id).toEqual(1)
    expect(wrapper.vm.responseError).toEqual(null)
  })
  it('should set error on failed saved bracket', async () => {
    const err = Error('Something didnt work')
    const manageBracket = jest.fn(() => {
      return Promise.reject(err)
    })
    const toastedSaved = jest.fn()
    const wrapper = setWrapper({ methods: {manageBracket},})
    expect(wrapper.vm.id).toEqual(undefined)
    wrapper.find('button').trigger('click')

    expect(wrapper.vm.responseError).toEqual(null)
    await flushPromises()
    expect(manageBracket).toHaveBeenCalled()
    expect(toastedSaved).not.toHaveBeenCalled()
    expect(wrapper.vm.id).toEqual(undefined)
    expect(wrapper.vm.responseError).toEqual(err)
  })
  // TODO this test throws availability mutation error, not sure why becasue isolated test works
  // it('should update winnerOfGames when game clicked', () => {
  //   const wrapper = mount(ManageBracketPage, {
  //     mocks: {$route: { params: {id: 1, bracket: {name: 'Coolo', games: {}, isUnique: false} } } },
  //   })
  //   wrapper.setData({initialGames: initialBracket})
  //   // console.log(wrapper.html())
  //   expect(wrapper.findAll({name: 'edit-bracket'})).toHaveLength(1)
  //   expect(wrapper.findAll({name: 'edit-match-up'})).toHaveLength(63)
  //   const inputs = wrapper.findAll(TeamSelect) //'.team-info')
  //   inputs.at(0).trigger('click')
  //   wrapper.vm.$emit('input', {1: {winner: 'top'}})
  //   inputs.at(1).trigger('click')
  //   wrapper.vm.$emit('input', {1: {winner: 'bottom'}})
  //   inputs.at(2).trigger('click')
  //   wrapper.vm.$emit('input', {1: {winner: 'bottom'}, 2: {winner: 'bottom'}})
  // })
})
