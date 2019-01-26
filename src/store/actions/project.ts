import { TBaseProject, TProject } from '../../types/project'
import { TCreateProject, TDeleteProject, TAction } from './types'
import { TState } from 'src/types/state'
import {
  filterItemsFromIds,
  getHighestIdElement
  // getHighestId
} from '../../utils'
import { TColumns } from 'src/types/column'
import { deleteColumnA, deleteColumn, createColumnA } from './column'
import { Dispatch } from 'redux'
import { createTaskA, editTaskA } from './task'
import { TTask } from 'src/types/task'

export const createCopiedProjectA = (
  project: TBaseProject,
  cloningId: number
) => {
  return (dispatch: Dispatch<TAction>, getState: () => TState) => {
    const cloning = getState().projects[cloningId]
    const cloningsColumns = Object.values(getState().columns).filter(col => {
      return cloning.columnIds.includes(col.id)
    })
    const cloningTasks: Array<TTask & { colId: number }> = Object.values(
      getState().tasks
    )
      .map(task => {
        for (const cloningCol of cloningsColumns) {
          if (cloningCol.taskIds.includes(task.id)) {
            return { ...task, colId: cloningCol.id, invalid: false } as any
          }
        }
        return { ...task }
      })
      .filter(task => task.colId !== undefined)

    dispatch(createProjectA(project))
    const newProject: TProject = getHighestIdElement(getState().projects)

    newProject.columnIds.map(columnId => {
      console.log('deleting newprojects col', columnId)
      dispatch(deleteColumn(columnId))
    })

    cloningsColumns.map(column => {
      console.log('creating cloned column: ', column.id)
      dispatch(createColumnA(column.name, newProject.id))
    })

    console.log(cloningTasks)

    cloningTasks.map(cloningTask => {
      const oldColId = cloningTask.colId
      const oldColIndex = cloning.columnIds.indexOf(oldColId)
      const firstColOfNew = newProject.columnIds[0]
      dispatch(createTaskA('', firstColOfNew + oldColIndex))
      const newTask = getHighestIdElement(getState().tasks)
      dispatch(editTaskA(newTask.id, { ...cloningTask, id: newTask.id }))
    })
  }
}

export const createProjectA = (project: TBaseProject): TCreateProject => ({
  type: 'CREATE_PROJECT',
  project
})

const deleteProject = (id: number): TDeleteProject => ({
  type: 'DELETE_PROJECT',
  id
})

export const deleteProjectA = (id: number) => {
  return (dispatch: Dispatch<TAction>, getState: () => TState) => {
    const projectsColumns: TColumns = filterItemsFromIds<TColumns>(
      getState().projects[id].columnIds,
      getState().columns
    )
    Object.keys(projectsColumns).map(key => {
      dispatch(deleteColumnA(parseInt(key, 10)) as any) // will this work?
    })
    // DO AFTER
    dispatch(deleteProject(id))
  }
}

export const renameProjectA = (name: string, id: number): TAction => ({
  type: 'RENAME_PROJECT',
  name,
  id
})
