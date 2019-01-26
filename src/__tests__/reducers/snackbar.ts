import { snackbarReducer } from '../../store/reducers/snackbar'
import { createStore } from 'redux'
import {
  defaultState,
  openSnackbarA,
  closeSnackbarA,
  createProjectA
} from '../../store'
import { baseProjectStandard } from '../data/baseProject'

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
  test('CREATE_PROJECT', () => {
    expect(store.getState().open).not.toBe(true)
    store.dispatch(createProjectA(baseProjectStandard))
    expect(store.getState()).toEqual({
      open: true,
      message: `${baseProjectStandard.name} created successfully!`,
      variant: 'success'
    })
  })
})
