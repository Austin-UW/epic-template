import { TaskAction } from '@store/actions/types'
import { TTasks, TSubtask } from 'src/types/task'
import { getHighestId } from '../../utils'
import { cloneDeep } from 'lodash'
import { isBefore } from 'date-fns/fp'

type IReducer<A = TaskAction, S = TTasks> = (state: S, action: A) => S

export const tasksReducer: IReducer = (tasks = {}, action): TTasks => {
  switch (action.type) {
    case 'CREATE_TASK':
      return {
        ...tasks,
        [getHighestId(tasks) + 1]: {
          id: getHighestId(tasks) + 1,
          subTasks: [],
          name: action.name,
          color: action.color,
          dueDate: action.dueDate,
          timeWorkedOn: 0
        }
      }
    case 'DELETE_TASK':
      const imTasks = cloneDeep(tasks)
      Object.keys(imTasks).map(key => {
        if (imTasks[key].id === action.id) {
          delete imTasks[key]
        }
      })
      return imTasks
    case 'CHECK_TASK_OVERDUE':
      const newTasks = cloneDeep(tasks)

      const date = Date.now()
      Object.keys(tasks).map((key, i) => {
        const task = newTasks[key]
        if (task.dueDate && !isBefore(task.dueDate, date)) {
          newTasks[key].hasPassed = true
        } else if (task.dueDate && isBefore(task.dueDate, date)) {
          newTasks[key].hasPassed = undefined
        }
      })
      return newTasks
    case 'EDIT_TASK':
      console.log(action.task)

      return {
        ...tasks,
        [action.id]: action.task
      }
    case 'TICK':
      if (action.taskId !== undefined) {
        return {
          ...tasks,
          [action.taskId]: {
            ...tasks[action.taskId],
            timeWorkedOn: tasks[action.taskId].timeWorkedOn + 1
          }
        }
      }
      return tasks
    case 'COMPLETE_SUBTASK':
      const subTask: TSubtask = tasks[action.taskId].subTasks.find(
        subT => subT.id === action.subTaskId
      ) as any
      const subTasks = tasks[action.taskId].subTasks
      const index = subTasks.indexOf(subTask)

      return {
        ...tasks,
        [action.taskId]: {
          ...tasks[action.taskId],
          subTasks: [
            ...subTasks.slice(0, index),
            { ...subTask, completed: !subTask.completed },
            ...subTasks.slice(index + 1)
          ]
        }
      }
    default:
      return tasks
  }
}
