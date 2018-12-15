import { createStore, applyMiddleware, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { defaultState, reducer } from '.'
import { TState, TAction } from 'src/types'

export const store: Store<TState, TAction> = createStore(
  reducer,
  defaultState,
  composeWithDevTools(applyMiddleware(thunk))
)
