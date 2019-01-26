import { defaultState, store, createProjectA } from '../../store'
import { TColumns } from '../../types/column'
import { createColumnA, deleteColumnA } from '../../store/actions/column'
import { getHighestId } from '../../utils'
import {
  createTaskA,
  moveTaskVerticalA,
  changeTasksColumn
} from '../../store/actions/task'

const getState = (): TColumns => store.getState().columns

beforeEach(() => {
  store.dispatch({ type: '@@INIT' } as any)
})

describe('columns reducer', () => {
  test('@@INIT', () => {
    expect(getState()).toEqual(defaultState.columns)
    expect(getState()).toMatchSnapshot()
  })
  test('CREATE_COLUMN', () => {
    const PROJECT_ID = 1
    store.dispatch(createColumnA('number 1', PROJECT_ID))
    // go through all id keys, turn them into natural numbers, and get maximum
    const highestId: number = Math.max(
      ...Object.keys(getState()).map(id => parseInt(id, 10))
    )
    const created = getState()[highestId]
    expect(store.getState().projects[PROJECT_ID].columnIds).toContain(highestId)
    expect(created).toEqual({
      id: getHighestId(getState()),
      name: 'number 1',
      isCompletedColumn: false,
      taskIds: []
    })
    expect(getState()).toMatchSnapshot()
  })
  test('CREATE_PROJECT', () => {
    const projectsBefore = Object.values(store.getState().projects)
    const stateBefore = Object.values(getState())
    const COLUMNS_ADDED_DEFAULT = 3
    store.dispatch(createProjectA(Object.values(defaultState.projects)[0]))
    expect(Object.values(store.getState().projects).length).toBe(
      projectsBefore.length + 1
    )
    expect(Object.values(getState()).length).toBe(
      stateBefore.length + COLUMNS_ADDED_DEFAULT
    )
    expect(getState()).toMatchSnapshot()
  })
  test('DELETE_COLUMN', () => {
    expect(getState()[9]).toBeDefined()
    store.dispatch(deleteColumnA(9) as any)
    expect(getState()[9]).not.toBeDefined()
    expect(getState()).toMatchSnapshot()
  })
  test('CREATE_TASK', () => {
    const COLUMN_ID = 1
    const before = getState()
    store.dispatch(createTaskA('Task Name', COLUMN_ID, 'BLUE', new Date()))
    expect(getState()[COLUMN_ID].taskIds).toHaveLength(
      before[COLUMN_ID].taskIds.length + 1
    )
    expect(getState()).toMatchSnapshot()
  })
  test('CHANGE_TASKS_COLUMN', () => {
    const TASK_ID = 1
    const NEW_COL_ID = 2
    const OLD_COL_ID = 0
    const NEW_INDEX = 1

    expect(getState()[NEW_COL_ID].taskIds).not.toContain(TASK_ID)

    store.dispatch(
      changeTasksColumn(TASK_ID.toString(), NEW_COL_ID, OLD_COL_ID, NEW_INDEX)
    )
    expect(getState()[OLD_COL_ID].taskIds).not.toContain(TASK_ID)
    expect(getState()[NEW_COL_ID].taskIds).toContain(TASK_ID)

    expect(getState()).toMatchSnapshot()
  })
  test('MOVE_TASK_VERTICALLY', () => {
    const TASK_ID = 1
    const NEW_INDEX = 1
    const COLUMN_ID = '0'
    expect(getState()[COLUMN_ID].taskIds[NEW_INDEX]).not.toBe(TASK_ID)
    store.dispatch(moveTaskVerticalA(TASK_ID.toString(), NEW_INDEX, COLUMN_ID))
    expect(getState()[COLUMN_ID].taskIds[NEW_INDEX]).toBe(TASK_ID)

    expect(getState()).toMatchSnapshot()
  })
})
