import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  withStyles,
  WithStyles,
  LinearProgress
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import * as React from 'react'
import { connect } from 'react-redux'
import { exUser as profile } from 'src/profiles'
import { TAuthType, MSProps, TUser } from 'src/types'
import { setCurrentUserA, startLoadingA, stopLoadingA, toggleA } from 'src/store'
import { NavLink } from './navlink'
import { link } from './linkStyles'
import { TState } from 'src/types/state'
// for navlink.tsx to use, need to do props because ts ain't smart

const styles = () => ({
  avatar: { height: 40, width: 40 },
  root: { flexGrow: 1, fontSize: 20 },
  myLink: link,
  badge: { top: 1, right: -15, fontSize: 18, color: 'white' },
  tooltip: { fontSize: 18 }
})
interface StateProps {
  user: TUser
  isLoading: boolean
  authenticated: boolean
}
interface DispatchProps {
  toggle: typeof toggleA
  // logout: typeof logoutA
  startLoading: typeof startLoadingA
  stopLoading: typeof stopLoadingA
  setCurrentUser: typeof setCurrentUserA
}

type Authed = 'map' | 'chat' | 'settings' | 'category' | 'categories' | 'cart'
type NoAuth = 'home' | '404' | TAuthType
export type Components = Authed | NoAuth

type OwnProps = { currentComponent?: Components; loadingBackground?: string }

type TProps = StateProps & DispatchProps & OwnProps & WithStyles<typeof styles>
/** organism */
class HeaderComp extends React.Component<TProps, { anchorEl: React.ReactNode }> {
  state = { anchorEl: null }

  handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget })
  }
  handleClose = () => {
    this.setState({ anchorEl: null })
  }
  toggleDrawer = () => {
    this.props.toggle(true)
  }
  toggleLoading = () => {
    const { isLoading, stopLoading, startLoading } = this.props
    isLoading ? stopLoading() : startLoading()
  }
  toggleAuth = () => {
    const { authenticated, setCurrentUser } = this.props
    !authenticated ? setCurrentUser(profile) : (() => null)() /* this.props.logout() */
  }
  render() {
    const { classes, currentComponent, authenticated, user, isLoading /* logout */ } = this.props
    const current = currentComponent
    // dont change to statefull component because "this" will not refer to Header
    return (
      <div style={{ marginBottom: 50 }} className={classes.root}>
        <AppBar style={{ boxShadow: 'none' }} color="primary">
          <Toolbar variant="dense">
            <IconButton style={{ color: 'white' }} onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>
            {/* dev utils, @todo: delete in prod */}
            <Button className={classes.myLink} onClick={this.toggleLoading}>
              Toggle Load
            </Button>
            <Button className={classes.myLink} onClick={this.toggleAuth}>
              Toggle Auth
            </Button>
            {/* real links */}
            <NavLink to="/" text="Home" underline={current === 'home'} />

            {!authenticated && (
              <>
                <NavLink to="/login" text="Login" underline={current === 'Login'} />
                <NavLink to="/register" text="Register" underline={current === 'Register'} />
              </>
            )}
            {/*  */}
            {authenticated && user && (
              <>
                <NavLink to="/" onClick={undefined /* logout */} text="Logout" />
                <Tooltip classes={{ tooltip: classes.tooltip }} title={`logged in as ${user.username}`}>
                  <Avatar src={user.image} className={classes.avatar} />
                </Tooltip>
              </>
            )}
          </Toolbar>
          {isLoading && <LinearProgress />}
        </AppBar>
      </div>
    )
  }
}

const mapState: MSProps<StateProps> = (state: TState) => {
  return {
    user: state.auth.user,
    authenticated: state.auth.isAuthenticated,
    isLoading: state.isLoading
  }
}

const actionCreators: DispatchProps = {
  // logout: logoutA,
  toggle: toggleA,
  startLoading: startLoadingA,
  stopLoading: stopLoadingA,
  setCurrentUser: setCurrentUserA
}
export const Header = connect(
  mapState,
  actionCreators
)(withStyles(styles)(HeaderComp))
