import { combineReducers } from 'redux'
import { snackbarReducer } from './snackbar'
import { loadingReducer } from './loading'
import { projectsReducer } from './projects'
import { tasksReducer } from './tasks'
import { columnsReducer } from './columns'
import { pomodoroReducer } from './pomodoro'
import { TAction } from '@store/actions/types'

export const reducer = combineReducers({
  isLoading: loadingReducer,
  snackbar: snackbarReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
  columns: columnsReducer,
  pomodoro: pomodoroReducer,
  pastAction: (state: any, action: TAction) => action
})
