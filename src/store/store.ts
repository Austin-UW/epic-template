import { createStore, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { reducer } from '.'
import { defaultState } from './defaultState'
import { TState } from '../types/state'
import { incrementDailyTimeA } from './actions/pomodoro'
import { TAction } from '@store/actions/types'

export const loadState = (): undefined | TState => {
  try {
    const serializedState = localStorage.getItem('newerState')
    if (serializedState === null) {
      return undefined
    }
    const state: TState = JSON.parse(serializedState)
    Object.keys(state.tasks).map(id => {
      const task = state.tasks[id]
      if (task.dueDate) {
        const date = new Date()
        date.setTime(Date.parse(state.tasks[id].dueDate as any))
        state.tasks[id].dueDate = date
      }
    })
    return state
  } catch (err) {
    return undefined
  }
}

const saveState = (state: TState) => {
  state = {
    ...state,
    pomodoro: { ...state.pomodoro, paused: true }
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

store.subscribe(() => {
  const pastAction = store.getState().pastAction
  const pastState = store.getState()
  if (pastAction.type === 'TICK') {
    if (pastState.pomodoro.currSeconds % 60 === 0) {
      store.dispatch(incrementDailyTimeA())
      store.dispatch({ type: 'CHECK_TASK_OVERDUE' })
      saveState(pastState) // save pomodoro time left every minute
    }
  } else if (pastAction.type === 'TICK_STOPWATCH') {
    if (pastState.pomodoro.stopWatch.time % 60 === 0) {
      store.dispatch({ type: 'CHECK_TASK_OVERDUE' })
      saveState(pastState)
    }
  } else if (pastAction.type !== 'CHECK_TASK_OVERDUE') {
    // dont let itself call itself that not good
    // store.dispatch({ type: 'CHECK_TASK_OVERDUE' })
    saveState(pastState)
  }
})
