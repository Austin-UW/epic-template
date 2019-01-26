import {
  TDeleteTask,
  TMoveTaskVertical,
  TEditTask,
  TCreateTask,
  TCompleteSubTask,
  TChangeTasksColumn
} from '@store/actions/types'
import { TTask } from 'src/types/task'
import { TState } from 'src/types/state'
import { Dispatch } from 'redux'
import { openSnackbarA } from '..'

export const deleteTaskA = (id: number): TDeleteTask => ({
  type: 'DELETE_TASK',
  id
})

export const moveTaskVerticalA = (
  id: string,
  newIndex: number,
  columnId: string
): TMoveTaskVertical => ({
  // should this just be automatically sorted by due date?
  type: 'MOVE_TASK_VERTICALLY',
  id,
  newIndex,
  columnId
})

export const changeTasksColumn = (
  id: string,
  newColumnId: number | undefined,
  oldColumnId: number | undefined,
  newIndex: number
): TChangeTasksColumn => ({
  type: 'CHANGE_TASKS_COLUMN',
  id,
  newColumnId,
  oldColumnId,
  newIndex
})

export function changeTasksColumnA(
  id: string,
  newColumnId: number | undefined,
  oldColumnId: number | undefined,
  newIndex: number
) {
  return (dispatch: Dispatch, getState: () => TState) => {
    if (
      newColumnId !== undefined &&
      getState().columns[newColumnId].isCompletedColumn
    ) {
      dispatch(
        openSnackbarA(
          `${getState().tasks[id].name} completed, good job!`,
          'success'
        )
      )
    }
    return dispatch(changeTasksColumn(id, newColumnId, oldColumnId, newIndex))
  }
}

export const editTaskA = (id: number, task: TTask): TEditTask => ({
  type: 'EDIT_TASK',
  id,
  task
})

export const createTaskA = (
  name: string,
  columnI: number,
  color: string = '#FFFFFF',
  dueDate?: Date
): TCreateTask => ({
  type: 'CREATE_TASK',
  name,
  columnI,
  color,
  dueDate
})

export const completeSubTaskA = (
  taskId: number,
  subTaskId: number
): TCompleteSubTask => ({
  type: 'COMPLETE_SUBTASK',
  taskId,
  subTaskId
})
