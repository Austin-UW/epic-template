import { store, defaultState } from '../../store'
import { TTasks } from 'src/types/task'
import {
  deleteTaskA,
  moveTaskVerticalA,
  editTaskA,
  completeSubTaskA
} from '../../store/actions/task'
import { createTaskA } from '../../store/actions/task'
import { getHighestId } from '../../utils'
import { tickA } from '../../store/actions/pomodoro'
import { subDays, addDays } from 'date-fns'
import { deleteColumnA } from '../../store/actions/column'

const getState = (): TTasks => store.getState().tasks

beforeEach(() => {
  store.dispatch({ type: '@@INIT' } as any)
})

describe('tasks reducer', () => {
  test('MOVE_TASK_VERTICALLY', () => {
    expect(store.getState().columns[0].taskIds).toEqual([0, 1, 2])
    store.dispatch(moveTaskVerticalA('0', 2, '0'))
    // index is index inside of state not index key, confusing :P
    expect(store.getState().columns[0].taskIds).toEqual([1, 2, 0])
  })
  test('CREATE_TASK', () => {
    const highestBefore = getHighestId(getState())
    store.dispatch(createTaskA('hao a!', 1, 'blue'))
    expect(
      Object.values(getState())[Object.values(getState()).length - 1]
    ).toEqual({
      id: highestBefore + 1,
      color: 'blue',
      name: 'hao a!',
      subTasks: [],
      timeWorkedOn: 0,
      dueDate: undefined
    })
  })

  test('EDIT_TASK', () => {
    store.dispatch(editTaskA(1, { ...defaultState.tasks[1], name: 'OOF' }))
    expect(store.getState().tasks[1].name).toBe('OOF')
  })
  test('CHECK_TASK_OVERDUE', () => {
    const future = addDays(new Date(), 1)
    const past = subDays(new Date(), 1)
    store.dispatch(createTaskA('NAME', 0, 'blue', future))
    const newId = getHighestId(store.getState().tasks)
    store.dispatch({ type: 'CHECK_TASK_OVERDUE' })
    expect(getState()[newId].hasPassed).toBeFalsy()
    store.dispatch(editTaskA(newId, { ...getState()[newId], dueDate: past }))
    store.dispatch({ type: 'CHECK_TASK_OVERDUE' })
    expect(getState()[newId].hasPassed).toBe(true)
  })
  test('TICK', () => {
    const oldTime = getState()[0].timeWorkedOn
    store.dispatch(tickA(0))
    expect(getState()[0].timeWorkedOn).toBe(oldTime + 1)
  })
  test('COMPLETE_SUBTASK', () => {
    store.dispatch(
      editTaskA(1, {
        ...defaultState.tasks[1],
        subTasks: [{ name: 'epic', completed: false, id: 0 }]
      })
    )
    const oldSubTask = getState()[1].subTasks[0]
    expect(oldSubTask.completed).toBeFalsy()
    store.dispatch(completeSubTaskA(1, 0))
    expect(getState()[1].subTasks[0].completed).not.toBeFalsy()
  })
  test('DELETE_COLUMN', () => {
    // deleting a column should delete all of its tasks
    expect(store.getState().columns[0]).toBeDefined()
    expect(store.getState().tasks[1]).toBeDefined()
    store.dispatch(deleteColumnA(0) as any)
    expect(store.getState().columns[0]).toBeUndefined()
    expect(store.getState().tasks[1]).toBeUndefined()
  })
  test('DELETE_TASK', () => {
    store.dispatch(deleteTaskA(2))
    expect(getState()[2]).toBeUndefined()
  })
})
