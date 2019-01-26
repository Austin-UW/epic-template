import { createStore, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { reducer } from '.'
import { defaultState } from './defaultState'
import { TState } from '../types/state'
import { TAction } from '@store/actions/types'

export const loadState = (): undefined | TState => {
  try {
    const serializedState = localStorage.getItem('newerState')
    if (serializedState === null) {
      return undefined
    }
    const state: TState = JSON.parse(serializedState)
    /* Object.keys(state.tasks).map(id => { // handle dates being stringified
      const date = new Date()
      date.setTime(Date.parse(state.tasks[id].dueDate as any))
      state.tasks[id].dueDate = date
    }) */
    return state
  } catch (err) {
    return undefined
  }
}

export const saveState = (state: TState) => {
  state = {
    // change some state you don't want to save like forms etc
    ...state
  }
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('newerState', serializedState)
  } catch (err) {}
}

export const store: Store<TState, TAction> = createStore(
  reducer,
  defaultState,
  composeWithDevTools(applyMiddleware(thunk))
)
