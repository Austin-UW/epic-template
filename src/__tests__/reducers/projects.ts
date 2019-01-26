import { defaultState, createProjectA, store } from '../../store'
import { baseProjectStandard } from '../data/baseProject'
import { getHighestId } from '../../utils'
import { renameProjectA, deleteProjectA } from '../../store/actions/project'
import { getHighestIdElement } from '../../utils'
import { createColumnA, moveColumnA } from '../../store/actions/column'

// we will create, rename, and delete a project
describe('project reducer', () => {
  test('defaults to correct state', () => {
    expect(store.getState().projects).toEqual(defaultState.projects)
  })
  test('CREATE_PROJECT', () => {
    const highestElemColIds: number[] = getHighestIdElement(
      store.getState().projects
    ).columnIds
    const id: number = highestElemColIds[highestElemColIds.length - 1]

    store.dispatch(createProjectA(baseProjectStandard))
    expect(getHighestIdElement(store.getState().projects)).toEqual({
      ...baseProjectStandard,
      columnIds: [id, id + 1, id + 2],
      id: getHighestId(store.getState().projects)
    })
  })
  test('RENAME_PROJECT', () => {
    store.dispatch(
      renameProjectA(
        'new name',
        getHighestIdElement(store.getState().projects).id
      )
    )
    expect(getHighestIdElement(store.getState().projects).name).toBe('new name')
  })
  test('DELETE_PROJECT', () => {
    const oldId = 0
    store.dispatch(deleteProjectA(oldId) as any)
    expect(store.getState().projects[0]).toBeUndefined()
    expect(store.getState().columns['2']).toBeUndefined()
    expect(store.getState().columns['3']).toBeDefined()
    expect(store.getState().tasks['0']).toBeUndefined()
  })
  test('CREATE_COLUMN', () => {
    const prev = store.getState().projects[2].columnIds.length
    store.dispatch(createColumnA('NAME', 2, true))
    expect(store.getState().projects[2].columnIds).toHaveLength(prev + 1)
  })
  test('MOVE_COLUMN', () => {
    store.dispatch({ type: '@@INIT' } as any)
    const PROJECT_ID = 0
    const COLUMN_ID = 1
    expect(store.getState().projects[PROJECT_ID].columnIds).toEqual([0, 1, 2])
    store.dispatch(moveColumnA(PROJECT_ID, COLUMN_ID, 'Back'))
    const columnIds = store.getState().projects[PROJECT_ID].columnIds
    expect(columnIds).toEqual([1, 0, 2])
    expect(store.getState()).toMatchSnapshot()
  })
})
