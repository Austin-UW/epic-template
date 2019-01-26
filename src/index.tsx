import React from 'react'
import { render } from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Switch, Route, HashRouter } from 'react-router-dom'

import { store, openSnackbarA } from './store'
import { createMuiTheme } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from '@date-io/date-fns'
import { AuthRender } from '@components/Auth/Auth'
import { NoMatch } from '@components/NoMatch/NoMatch'
import { SnackbarRoot } from '@components/utils/SnackbarRoot'
import { About } from '@components/About/About'

import 'react-typist/dist/Typist.css'
import { Header } from '@components/Header'

const primary = '#c2185b'
const secondary = '#191970'
/** @description Material ui theme, used in wrapper.tsx */

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary
    },
    secondary: {
      main: secondary
    }
  }
})

class Router extends React.Component<any, { open: boolean }> {
  state = { open: false }
  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <HashRouter>
          <>
            <Header />
            <Switch>
              <Route
                exact
                path="/login"
                render={() => <AuthRender authType="Login" />}
              />
              <Route
                exact
                path="/register"
                render={() => <AuthRender authType="Register" />}
              />
              <Route exact path="/" component={About} />
              <Route component={NoMatch} />
            </Switch>
          </>
        </HashRouter>
      </MuiPickersUtilsProvider>
    )
  }
}

export const Wrapper = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <SnackbarRoot />
        <Router />
      </MuiThemeProvider>
    </Provider>
  )
}

// runs on refresh or not?

window.onload = () => {
  store.dispatch(openSnackbarA('Hey there, good choice!', 'success'))
}

render(<Wrapper />, document.getElementById('root'))
