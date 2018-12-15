import { TState } from 'src/types'

export const defaultState: TState = {
  drawerOpen: false,
  snackbar: {
    open: false,
    message: 'WE ARE IN BOIS, HOLD YOUR GROUND',
    variant: 'success'
  },
  error: {
    message: null
  },
  auth: {
    isAuthenticated: false,
    user: null
  },
  isLoading: false
}
