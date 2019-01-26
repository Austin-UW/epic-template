import { TVariant } from 'src/types/state'
import { TBaseProject } from 'src/types/project'
import { TTask } from 'src/types/task'

/** snackbar */
export type TOpenSnackbar = {
  type: 'OPEN_SNACKBAR'
  message: string
  variant: TVariant
}
export type TCloseSnackbar = { type: 'CLOSE_SNACKBAR' }

export type SnackbarAction = TOpenSnackbar | TCloseSnackbar | TCreateProject

/** loading */
export type TStartLoading = { type: 'START_LOADING' }
export type TStopLoading = { type: 'STOP_LOADING' }

export type LoadingAction = TStartLoading | TStopLoading
/** project */

export type TCreateProject = { type: 'CREATE_PROJECT'; project: TBaseProject }
export type TDeleteProject = { type: 'DELETE_PROJECT'; id: number }
export type TRenameProject = {
  type: 'RENAME_PROJECT'
  id: number
  name: string
}

export type TCreateColumn = {
  type: 'CREATE_COLUMN'
  isCompletedColumn: boolean
  name: string
  projectId: number
}

export type TMoveColumn = {
  type: 'MOVE_COLUMN'
  projectId: number
  columnId: number
  direction: 'Back' | 'Forward'
}

/** both project and column reducer use these */
type ProjectAndColumnAction = TCreateColumn | TMoveColumn | TCreateProject
export type ProjectAction =
  | TDeleteProject
  | TDeleteColumn
  | TRenameProject
  | ProjectAndColumnAction
/** column */
export type TMoveTaskVertical = {
  type: 'MOVE_TASK_VERTICALLY'
  id: string
  newIndex: number
  columnId: string
}

export type TChangeTasksColumn = {
  type: 'CHANGE_TASKS_COLUMN'
  id: string
  newColumnId?: number
  oldColumnId?: number
  newIndex: number
}

export type TDeleteColumn = { type: 'DELETE_COLUMN'; id: number }

export type ColumnAction =
  | ProjectAndColumnAction
  | TCreateColumn
  | TDeleteColumn
  | TChangeTasksColumn
  | TMoveTaskVertical
  | TaskAndColumn

type TaskAndColumn = TCreateTask
/** task */

export type TCompleteSubTask = {
  type: 'COMPLETE_SUBTASK'
  taskId: number
  subTaskId: number
}

export type TDeleteTask = { type: 'DELETE_TASK'; id: number }

export type TEditTask = {
  type: 'EDIT_TASK'
  id: number
  task: TTask
}

export type TCreateTask = {
  type: 'CREATE_TASK'
  name: string
  columnI: number
  color: string
  dueDate?: Date
}

export type TaskAction =
  | TDeleteTask
  | TEditTask
  | TaskAndPomodoro
  | TCompleteSubTask
  | TaskAndColumn
  | { type: 'CHECK_TASK_OVERDUE' }

type TaskAndPomodoro = TTick
/** pomodoro */
export type TStopTimer = { type: 'STOP_TIMER' }
export type TStartTimer = { type: 'START_TIMER' }
export type TChangeWorkTime = {
  type: 'CHANGE_WORK_TIME'
  operator: '+' | '-'
  minutes: number
}
export type TChangeBreakTime = {
  type: 'CHANGE_BREAK_TIME'
  operator: '+' | '-'
  minutes: number
}
export type TTick = {
  type: 'TICK'
  taskId?: number
}

export type TResetPomodoro = {
  type: 'RESET_POMODORO'
}

export type TIncrementDailyTime = { type: 'INCREMENT_DAILY_TIME' }

export type TSelectPomodoroTask = {
  type: 'SELECT_POMODORO_TASK'
  taskId: null | string
}

export type TToggleSelectingTask = {
  type: 'TOGGLE_SELECTING_TASK'
}

export type TTickStopwatch = {
  type: 'TICK_STOPWATCH'
}

export type TToggleStopwatch = {
  type: 'TOGGLE_STOPWATCH'
}

export type TResetStopwatch = {
  type: 'RESET_STOPWATCH'
}

export type TSetTimeDev = { type: 'SET_TIME_DEV' }

export type PomodoroAction =
  | TStopTimer
  | TStartTimer
  | TChangeBreakTime
  | TChangeWorkTime
  | TResetPomodoro
  | TaskAndPomodoro
  | TIncrementDailyTime
  | TSelectPomodoroTask
  | TToggleSelectingTask
  | TSetTimeDev
  | TTickStopwatch
  | TToggleStopwatch
  | TResetStopwatch

export type TAction = Readonly<
  | SnackbarAction
  | LoadingAction
  | ProjectAction
  | TaskAction
  | ColumnAction
  | PomodoroAction
>
