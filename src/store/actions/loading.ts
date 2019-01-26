import { TStopLoading, TStartLoading } from './types'

export const startLoadingA = (): TStartLoading => ({
  type: 'START_LOADING'
})
export const stopLoadingA = (): TStopLoading => ({
  type: 'STOP_LOADING'
})
