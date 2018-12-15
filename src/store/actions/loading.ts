import { TAction } from 'src/types'

export const startLoadingA = (): TAction => ({
  type: 'START_LOADING'
})
export const stopLoadingA = (): TAction => ({
  type: 'STOP_LOADING'
})
