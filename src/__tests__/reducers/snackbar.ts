import { snackbarReducer } from '../../store/reducers/snackbar'
import { createStore } from 'redux'
import { defaultState, openSnackbarA, closeSnackbarA } from '../../store'

const store = createStore(snackbarReducer, defaultState.snackbar as any)

describe('snackbar reducer', () => {
  test('@@INIT', () => {
    expect(store.getState()).toEqual(defaultState.snackbar)
  })
  test('OPEN_SNACKBAR', () => {
    store.dispatch(openSnackbarA('msg', 'warning'))
    expect(store.getState()).toEqual({
      open: true,
      message: 'msg',
      variant: 'warning'
    })
  })
  test('CLOSE_SNACKBAR', () => {
    expect(store.getState().open).not.toBe(false)
    store.dispatch(closeSnackbarA())
    expect(store.getState().open).toBe(false)
  })
})
