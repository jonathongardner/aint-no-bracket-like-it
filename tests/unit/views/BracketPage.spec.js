import { shallowMount } from '@vue/test-utils'
import BracketPage from '@/views/BracketPage.vue'
import {bracketApi} from '@/helpers/api.js'
import bracketOptions from '@/helpers/bracketOptions.js'

describe('BracketPage.vue', () => {
  const getBracketMock = jest.spyOn(bracketApi, "getBracket")
  afterEach(() => {
    getBracketMock.mockClear()
  })
  it('request bracket on create from year param', () => {

    const wrapper = shallowMount(BracketPage, {
      mocks: {
        $route: {
          params: {
            year: 2010,
          }
        }
      },
    })
    expect(getBracketMock).toHaveBeenCalledWith(2010)
  })
  it('request for year should not be greater than lastYear', () => {
    const addMock = jest.spyOn(bracketApi, "getBracket")
    const wrapper = shallowMount(BracketPage, {
      mocks: {
        $route: {
          params: {
            year: bracketOptions.lastYear + 1,
          }
        }
      },
    })
    expect(getBracketMock).toHaveBeenCalledWith(bracketOptions.lastYear)
    // Make sure they are notified what year is actually being searched
    expect(wrapper.find('.subtitle').text())
      .toMatch("Woah!!!! You trying to get me to tell you the future... I don't think so. Here's " + bracketOptions.lastYear)
  })
  it('request for year should not be before the firstYear', () => {
    const addMock = jest.spyOn(bracketApi, "getBracket")
    const wrapper = shallowMount(BracketPage, {
      mocks: {
        $route: {
          params: {
            year: bracketOptions.firstYear - 1,
          }
        }
      },
    })
    expect(getBracketMock).toHaveBeenCalledWith(bracketOptions.firstYear)
    // Make sure they are notified what year is actually being searched
    expect(wrapper.find('.subtitle').text())
      .toMatch("Sorry... I can't rembember that far back. Here's " + bracketOptions.firstYear)
  })
  it('should request for year when year changes', () => {
    const addMock = jest.spyOn(bracketApi, "getBracket")
    const route = {
      params: {
        year: bracketOptions.lastYear - 1,
      }
    }
    const wrapper = shallowMount(BracketPage, {
      mocks: {
        $route: route
      },
    })
    expect(getBracketMock).toHaveBeenCalledTimes(1)
    route.params.year = route.params.year + 1
    expect(getBracketMock).toHaveBeenCalledTimes(2)
  })
})
