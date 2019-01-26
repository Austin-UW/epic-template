import React, { CSSProperties } from 'react'
import { render } from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Switch, Route, HashRouter } from 'react-router-dom'

import { store, openSnackbarA } from './store'
import { createMuiTheme } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import MomentUtils from '@date-io/date-fns'
import { Pomodoro } from '@components/Pomodoro/Pomodoro'
import { AuthRender } from '@components/Auth/Auth'
import { CreateProject } from '@components/createProject/CreateProject'
import { Project } from '@components/Project/Project'
import { NoMatch } from '@components/NoMatch/NoMatch'
import { SnackbarRoot } from '@components/utils/SnackbarRoot'
import { HomePage } from '@components/Home/Home'
import { Fab } from '@material-ui/core'
import { Timer } from '@material-ui/icons'
import { Dev } from '@components/dev'
import { Calendar } from '@components/Calendar/Calendar'
import { Week } from '@components/Week/Week'
import { About } from '@components/About/About'
import { TaskList } from '@components/TaskList/TaskList'

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

const fabStyle: CSSProperties = {
  position: 'fixed',
  bottom: theme.spacing.unit * 2,
  left: theme.spacing.unit * 2,
  zIndex: 999
}
// hi
class Router extends React.Component<any, { open: boolean }> {
  state = { open: false }
  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <HashRouter>
          <>
            <Header />
            <Pomodoro
              open={this.state.open}
              stateFunc={(bool: boolean) => this.setState({ open: bool })}
            />
            {!this.state.open && (
              <>
                <Fab
                  style={fabStyle}
                  color="secondary"
                  onClick={() => this.setState({ open: true })}
                >
                  <Timer />
                </Fab>
              </>
            )}
            <Switch>
              <Route exact path="/dashboard" component={HomePage} />
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
              <Route
                exact
                path="/create-project"
                render={() => <CreateProject />}
              />
              <Route
                path="/project/:id"
                render={props => {
                  return <Project id={parseInt(props.match.params.id, 10)} />
                }}
              />
              <Route exact path="/week" component={Week} />
              <Route exact path="/dev" component={Dev} />
              <Route exact path="/calendar" component={Calendar} />
              <Route exact path="/" component={About} />
              <Route exact path="/tasks" component={TaskList} />
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
  store.dispatch({ type: 'CHECK_TASK_OVERDUE' }) // checking at start is most important because that is when the most time will have elapsed
}

setInterval(() => {
  store.dispatch({ type: 'CHECK_TASK_OVERDUE' })
}, 30 * 1000)

render(<Wrapper />, document.getElementById('root'))
