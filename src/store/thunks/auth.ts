import { AuthState } from 'src/components/auth/auth'
import { Dispatch } from 'redux'
import { openSnackbarA, stopLoadingA, startLoadingA, setCurrentUserA, removeErrorA } from '..'
import { API } from 'src/utils'
import { TAuthType } from 'src/types'
// username may not be passed for login
export const authUserU = (authType: TAuthType, data: AuthState) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(startLoadingA())
      const { token, ...user } = await API.call('post', `auth/${authType}`, data)
      localStorage.setItem('jwtToken', token)
      API.setToken(token)
      dispatch(setCurrentUserA(user))
      dispatch(removeErrorA())
      dispatch(stopLoadingA())
      dispatch(openSnackbarA('logged in successfully', 'success'))
    } catch (err) {
      const { error } = err.responce.data
      dispatch(openSnackbarA(error.message, 'error'))
      dispatch(stopLoadingA())
    }
  }
}
