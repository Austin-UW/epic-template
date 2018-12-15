import { TSnackbar, TUser } from '.'

export type TState = {
  drawerOpen: boolean
  snackbar: TSnackbar
  auth: {
    isAuthenticated: boolean
    user: TUser
  }
  isLoading: boolean
  error: {
    message: string | null
  }
}
