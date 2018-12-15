import { TAction } from 'src/types'

export const addErrorA = (error: string): TAction => ({
  type: 'ADD_ERROR',
  error
})

export const removeErrorA = (): TAction => {
  return {
    type: 'REMOVE_ERROR'
  }
}
