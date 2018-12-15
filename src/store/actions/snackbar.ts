import { TAction, TVariant } from 'src/types'

export const closeSnackbarA = (): TAction => ({
  type: 'CLOSE_SNACKBAR'
})

export const openSnackbarA = (message: string, variant: TVariant): TAction => ({
  type: 'OPEN_SNACKBAR',
  message,
  variant
})
