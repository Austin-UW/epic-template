import { TColumns } from '../../types/column'
import { ColumnAction } from '@store/actions/types'
import { getHighestId } from '../../utils'
import { omit, cloneDeep } from 'lodash'

type IReducer<A = ColumnAction, S = Readonly<TColumns>> = (
  state: S,
  action: A
) => S

export const columnsReducer: IReducer = (columns = {}, action): TColumns => {
  switch (action.type) {
    case 'CREATE_COLUMN':
      return {
        ...columns,
        [getHighestId(columns) + 1]: {
          name: action.name,
          isCompletedColumn: action.isCompletedColumn,
          id: getHighestId(columns) + 1,
          taskIds: []
        }
      }
    case 'CREATE_PROJECT':
      const ids = []
      for (let i = 1; i < 4; i++) {
        ids.push(getHighestId(columns) + i)
      }
      console.log(getHighestId(columns) + 1, ids)
      return {
        ...columns,
        [ids[0]]: { name: 'To-do', taskIds: [], id: ids[0] },
        [ids[1]]: { name: 'In Progress', taskIds: [], id: ids[1] },
        [ids[2]]: {
          name: 'Done',
          taskIds: [],
          id: ids[2],
          isCompletedColumn: true
        }
      }
    case 'CREATE_TASK':
      const TaskIds = Object.values(columns).reduce(
        (accum: number[], column) => (accum = [...accum, ...column.taskIds]),
        []
      )
      const max = Math.max(...TaskIds)
      return {
        ...columns,
        [action.columnI]: {
          ...columns[action.columnI],
          taskIds: [
            ...columns[action.columnI].taskIds,
            max !== null ? max + 1 : 0
          ]
        }
      }
    case 'DELETE_COLUMN':
      return omit({ ...columns }, action.id)
    case 'CHANGE_TASKS_COLUMN':
      const copy: TColumns = cloneDeep(columns)
      const id = parseInt(action.id, 10)

      if (
        action.newColumnId === undefined &&
        action.oldColumnId !== undefined
      ) {
        const oldColIds = [...columns[action.oldColumnId].taskIds]
        oldColIds.splice(oldColIds.indexOf(id), 1)
        copy[action.oldColumnId].taskIds = oldColIds
        return copy
      } else if (action.newColumnId !== undefined) {
        const newColIds = columns[action.newColumnId].taskIds
        newColIds.splice(action.newIndex, 0, id)
        copy[action.newColumnId].taskIds = newColIds
        if (action.oldColumnId !== undefined) {
          const oldColIds = [...columns[action.oldColumnId].taskIds]
          oldColIds.splice(oldColIds.indexOf(id), 1)
          copy[action.oldColumnId].taskIds = oldColIds
        }
        return copy
      }
      return columns
    case 'MOVE_TASK_VERTICALLY':
      const newTaskIds = columns[action.columnId].taskIds
      const oldIndex = newTaskIds.indexOf(parseInt(action.id, 10))
      newTaskIds.splice(oldIndex, 1) // delete where it used to be
      newTaskIds.splice(action.newIndex, 0, parseInt(action.id, 10)) // add to where it should be
      return {
        ...columns,
        [action.columnId]: {
          ...columns[action.columnId],
          taskIds: [...newTaskIds]
        }
      }

    default:
      return columns
  }
}
