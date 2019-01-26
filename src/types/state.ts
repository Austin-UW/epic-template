import { TProjects } from './project'
import { TColumns } from './column'
import { TTasks } from './task'
import { TPomodoro } from './pomodoro'
import { TAction } from '../store/actions/types'

export type TVariant = 'success' | 'warning' | 'error'

export type TSnackbar = {
  open: boolean
  message: string
  variant: TVariant
}

export type TState = Readonly<{
  snackbar: TSnackbar
  pastAction: TAction
  isLoading: boolean
  projects: TProjects
  columns: TColumns
  tasks: TTasks
  pomodoro: TPomodoro
}>
