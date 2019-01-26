import { TOpenSnackbar, TCloseSnackbar } from './types'
import { TVariant } from '../../types/state'

export const closeSnackbarA = (): TCloseSnackbar => ({
  type: 'CLOSE_SNACKBAR'
})

export const openSnackbarA = (
  message: string,
  variant: TVariant
): TOpenSnackbar => ({
  type: 'OPEN_SNACKBAR',
  message,
  variant
})
