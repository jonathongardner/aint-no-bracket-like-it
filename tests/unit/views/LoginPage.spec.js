import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import LoginPage from '@/views/LoginPage.vue'
import Vuex from 'vuex'
import { LOGIN } from '@/mutation-types'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('LoginPage.vue', () => {
  let actions
  let store
  let mocks

  function createWrapperAndClickSubmit(pword, beforeClick) {
    const wrapper = shallowMount(LoginPage, {store, localVue, mocks})
    wrapper.find('input[type="login"]').setValue('CorrectLogin')
    wrapper.find('input[type="password"]').setValue(pword)

    if (beforeClick) {
      beforeClick(wrapper)
    }

    wrapper.find("#submitButton").trigger('submit')
    expect(actions[LOGIN]).toHaveBeenCalled()
    return wrapper
  }

  beforeEach(() => {
    actions = {
      [LOGIN]: jest.fn((s, params) => {
        if (params.password === 'CorrectPassword') {
          return Promise.resolve()
        } else {
          return Promise.reject(Error('That didnt work'))
        }
      }),
    }
    store = new Vuex.Store({
      state: {},
      actions
    })
    mocks = {
      $toasted: {
        show: jest.fn(),
      },
      $route: {name: 'somewhere'},
      $router: []
    }
  })

  it('should only allow submitting when login and password are filled in', async () => {
    const wrapper = shallowMount(LoginPage, {store, localVue})
    expect(wrapper.text()).toMatch('Please login to proceed.')

    wrapper.find("#submitButton").trigger('submit')
    expect(actions[LOGIN]).not.toHaveBeenCalled()

    wrapper.find('input[type="login"]').setValue('CorrectLogin')
    wrapper.find('input[type="password"]').setValue('CorrectPassword')

    wrapper.find("#submitButton").trigger('submit')
    expect(actions[LOGIN]).toHaveBeenCalled()
  })

  it('should return to home if page is login on successful login', async () => {
    mocks.$route.name = 'login'
    const wrapper = createWrapperAndClickSubmit('CorrectPassword')
    await flushPromises()
    expect(mocks.$router.length).toEqual(1)
    expect(mocks.$router[0].name).toEqual('home')
  })

  it('should not return to home if page is login on failed login', async () => {
    const wrapper = createWrapperAndClickSubmit('BadPassword')

    await flushPromises()
    expect(mocks.$router.length).toEqual(0)
  })

  it('should set responseError to null, pword to blank, show toast, and stay on page (if not login page) on successful login', async () => {
    const someError = Error('Some Error')
    const wrapper = createWrapperAndClickSubmit('CorrectPassword', (wrapper) => {
      wrapper.setData({responseError: someError})
      expect(wrapper.vm.responseError).toEqual(someError)
    })

    // Check it is set to null outside promise
    expect(wrapper.vm.responseError).toEqual(null)
    await flushPromises()
    expect(mocks.$toasted.show).toHaveBeenCalledTimes(1)
    // Should not change page since name wasnt home
    expect(mocks.$router.length).toEqual(0)

    // Check it remains null if it doesnt enter catch
    expect(wrapper.vm.responseError).toEqual(null)
    expect(wrapper.vm.pword).toEqual('')
  })

  it('should set responseError to error, pword to blank and dont show toast on failed login', async () => {
    const someError = Error('Some Error') // TODO make error that will show up in error component
    const wrapper = createWrapperAndClickSubmit('BadPassword', (wrapper) => {
      wrapper.setData({responseError: someError})
      expect(wrapper.vm.responseError).toEqual(someError)
    })

    // Check it is set to null outside promise
    expect(wrapper.vm.responseError).toEqual(null)
    await flushPromises()
    expect(mocks.$toasted.show).not.toHaveBeenCalled()
    expect(wrapper.vm.responseError.message).toEqual('That didnt work')
    // Check pword is still set to blank
    expect(wrapper.vm.pword).toEqual('')
  })
})
