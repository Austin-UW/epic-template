import { TAction, TUser } from 'src/types'

export const setCurrentUserA = (user: TUser): TAction => {
  return {
    type: 'SET_CURRENT_USER',
    user
  }
}
export const toggleA = (open: boolean): TAction => ({ type: 'TOGGLE_MENU', open })
