import { TProjects } from '../../types/project'
import { ProjectAction } from '../actions/types'
import { getHighestId } from '../../utils'
import { omit, cloneDeep } from 'lodash'
import { defaultState } from '../defaultState'

type IReducer<A = ProjectAction, S = Readonly<TProjects>> = (
  state: S,
  action: A
) => TProjects

const move = (array: number[], fromIndex: number, toIndex: number) => {
  array.splice(toIndex, 0, array.splice(fromIndex, 1)[0])
}

export const projectsReducer: IReducer = (projects = {}, action) => {
  switch (action.type) {
    case 'DELETE_COLUMN':
      const projectId = Object.values(projects).filter(project => {
        return project.columnIds.includes(action.id)
      })[0].id
      const colIds = [...projects[projectId].columnIds]
      const indexOfColId = colIds.indexOf(action.id)
      return {
        ...projects,
        [projectId]: {
          ...projects[projectId],
          columnIds: [
            ...colIds.slice(0, indexOfColId),
            ...colIds.slice(indexOfColId + 1)
          ]
        }
      }
    case 'CREATE_PROJECT':
      let highestColumnId = -1
      Object.values(projects).map(project => {
        project.columnIds.map(id => {
          if (id > highestColumnId) {
            highestColumnId = id
          }
        })
      })

      let ids: number[] = []

      if (highestColumnId === -1) {
        ids = [0, 1, 2]
      } else {
        ids = [highestColumnId + 1, highestColumnId + 2, highestColumnId + 3]
      }
      return {
        ...projects,
        [getHighestId(projects) + 1]: {
          ...action.project,
          columnIds: ids,
          id: getHighestId(projects) + 1
        }
      }
    case 'DELETE_PROJECT':
      return omit({ ...projects }, [action.id])
    case 'RENAME_PROJECT':
      return {
        ...projects,
        [action.id]: {
          ...projects[action.id],
          name: action.name
        }
      }
    case 'CREATE_COLUMN':
      let columnIds = Object.values(projects).reduce(
        (accum: number[], project) =>
          (accum = [...accum, ...project.columnIds]),
        []
      )
      if (columnIds === null) {
        columnIds = [-1] // start at 0(Math.max(...[-1]) + 1)
      }
      return {
        ...projects,
        [action.projectId]: {
          ...projects[action.projectId],
          columnIds: [
            ...projects[action.projectId].columnIds,
            Math.max(...columnIds) + 1
          ]
        }
      }
    case 'MOVE_COLUMN':
      const newProject = cloneDeep(projects[action.projectId])
      const index = newProject.columnIds.indexOf(action.columnId)

      const newIndex = action.direction === 'Back' ? index - 1 : index + 1
      if (newIndex === -1 || newIndex === newProject.columnIds.length) {
        return { ...projects }
      }
      move(newProject.columnIds, index, newIndex)
      return {
        ...projects,
        [action.projectId]: newProject
      }
    case '@@INIT' as any:
      return defaultState.projects
    default:
      return projects
  }
}
