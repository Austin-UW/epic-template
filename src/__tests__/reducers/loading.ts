import { startLoadingA, stopLoadingA, store } from '../../store'

// these tests rely on eachother to mutate and change state

describe('loading reducer', () => {
  test('defaults as not loading', () => {
    expect(store.getState().isLoading).toBe(false)
  })
  test('starts loading', () => {
    store.dispatch(startLoadingA())
    expect(store.getState().isLoading).toBe(true)
  })
  test('stops loading', () => {
    store.dispatch(stopLoadingA())
    expect(store.getState().isLoading).toBe(false)
  })
})
