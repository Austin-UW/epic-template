import React from 'react'
import { render } from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Drawer, Home, NoMatch, AuthRender, SnackbarRoot } from 'src/components'
import { store } from './store'
import { createMuiTheme } from '@material-ui/core/styles'

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

const Router = () => {
  return (
    <BrowserRouter>
      <>
        <Drawer />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" render={() => <AuthRender authType="Login" />} />
          <Route path="/register" render={() => <AuthRender authType="Register" />} />
          <Route component={NoMatch} />
        </Switch>
      </>
    </BrowserRouter>
  )
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

render(<Wrapper />, document.getElementById('root'))
