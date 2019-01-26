import { Reducer } from 'redux'
import { defaultSnackbar } from '../defaultState'
import { TSnackbar } from '../../types/state'
import { SnackbarAction } from '../actions/types'

export const snackbarReducer: Reducer<TSnackbar, SnackbarAction> = (
  snackbar: TSnackbar = defaultSnackbar,
  action
) => {
  switch (action.type) {
    case 'OPEN_SNACKBAR':
      const { message, variant } = action
      return { open: true, message, variant }
    case 'CLOSE_SNACKBAR':
      return { ...snackbar, open: false }
    case 'CREATE_PROJECT':
      return {
        ...snackbar,
        open: true,
        message: `${action.project.name} created successfully!`,
        variant: 'success'
      }
    default:
      return snackbar
  }
}
