import { reducer } from '../../store/reducers/reducer'
import { defaultState, startLoadingA } from '../../store'
import { createStore } from 'redux'

const store = createStore(reducer, defaultState as any)

beforeEach(() => {
  store.dispatch({ type: '@@INIT' })
})

describe('reducer', () => {
  test('@@INIT', () => {
    expect(store.getState()).toEqual(defaultState)
  })
  test('START_LOADING and STOP_LOADING', () => {
    expect(store.getState().isLoading).toBe(false)
    store.dispatch(startLoadingA())
    expect(store.getState().isLoading).toBe(true)
  })
})
