import { TVariant } from 'src/types/state'

/** snackbar */
export type TOpenSnackbar = {
  type: 'OPEN_SNACKBAR'
  message: string
  variant: TVariant
}
export type TCloseSnackbar = { type: 'CLOSE_SNACKBAR' }

export type SnackbarAction = TOpenSnackbar | TCloseSnackbar

/** loading */
export type TStartLoading = { type: 'START_LOADING' }
export type TStopLoading = { type: 'STOP_LOADING' }

export type TLoadingAction = TStartLoading | TStopLoading

export type TAction = SnackbarAction | TLoadingAction
