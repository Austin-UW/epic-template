import { TUser, TVariant } from '.'

export type TOpenSnackbar = { type: 'OPEN_SNACKBAR'; message: string; variant: TVariant }
export type TCloseSnackbar = { type: 'CLOSE_SNACKBAR' }

export type TSetCurrentUser = { type: 'SET_CURRENT_USER'; user: TUser }
export type TStartLoading = { type: 'START_LOADING' }
export type TStopLoading = { type: 'STOP_LOADING' }
export type TToggleMenu = { type: 'TOGGLE_MENU'; open: boolean }
export type TReset = { type: 'RESET' }

export type TAction = Readonly<
  | TOpenSnackbar
  | TCloseSnackbar
  | TSetCurrentUser
  | TStartLoading
  | TStopLoading
  | TToggleMenu
  | TReset
  | { type: '@@INIT' }
>
