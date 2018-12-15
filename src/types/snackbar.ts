export type TVariant = 'success' | 'warning' | 'error'

export type TSnackbar = {
  open: boolean
  message: string
  variant: TVariant
}
