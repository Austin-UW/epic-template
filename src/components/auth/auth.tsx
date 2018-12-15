import React, { Component, ChangeEvent, FormEvent } from 'react'
import { connect } from 'react-redux'
import { Paper, Grid, Button, withStyles, WithStyles, Avatar, Typography } from '@material-ui/core'
import { LockOpen, Face, Fingerprint, Email } from '@material-ui/icons'
import { Header } from '../header/header'
import { TAuthType, MSProps } from 'src/types'
import { styles } from '../styles/form'
import { authUserU } from 'src/store'
import { Input } from './input'
import { ActionDialogue } from './dialogue'
import { TState } from 'src/types/state'
type StateProps = {
  isAuthenticated: boolean
}
type DispatchProps = {
  authUser: typeof authUserU
}
type OwnProps = {
  authType: TAuthType
}
type TProps = WithStyles<typeof styles> & StateProps & DispatchProps & OwnProps

const initialState = { username: '', password: '', email: '' }

export type AuthState = typeof initialState & { [index: string]: any }

// utility type
type Change = ChangeEvent<HTMLInputElement>

class Auth extends Component<TProps, AuthState> {
  state = initialState
  // can be called as: handleChange(e)('username')
  handleChange = (e: Change) => (place: 'username' | 'password' | 'email') => {
    this.setState({ [place]: e.target.value })
  }
  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { authType } = this.props
    this.props.authUser(authType, this.state)
  }

  render() {
    const { classes, isAuthenticated, authType } = this.props
    // make first letter an uppercase
    const { email, username, password } = this.state
    return (
      <div>
        <Header currentComponent={this.props.authType} />
        {!isAuthenticated && (
          <main className={classes.layout}>
            <form onSubmit={this.handleSubmit}>
              <Paper style={{ flexDirection: 'column' }} className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOpen />
                </Avatar>
                <Typography style={{ fontSize: 16 }} component="h1">
                  {authType}
                </Typography>
                <ActionDialogue authType={authType} />
                {/* email */}
                <Input
                  Icon={Email}
                  value={email}
                  autoComplete="email"
                  handleChange={(e: Change) => this.handleChange(e)('email')}
                  label="Email"
                  type="email"
                />
                {/* username */}

                {authType === 'Register' && (
                  <Input
                    Icon={Face}
                    handleChange={(e: Change) => this.handleChange(e)('username')}
                    value={username}
                    label="Username"
                  />
                )}
                {/* password */}
                <Input
                  label="Password"
                  Icon={Fingerprint}
                  autoComplete="current-password"
                  value={password}
                  handleChange={(e: Change) => this.handleChange(e)('password')}
                  type="password"
                />
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                  <Button
                    variant="raised"
                    color="secondary"
                    fullWidth
                    type="submit"
                    style={{ marginTop: 10, borderRadius: 0, padding: '10px 10px', textTransform: 'none' }}
                  >
                    {authType}
                  </Button>
                </Grid>
              </Paper>
            </form>
          </main>
        )}
        {isAuthenticated && <div>You are already logged in!</div>}
      </div>
    )
  }
}
const mapState: MSProps<StateProps> = (state: TState) => ({
  isAuthenticated: state.auth.isAuthenticated
})
export const AuthRender = withStyles(styles)(
  connect(
    mapState,
    { authUser: authUserU }
  )(Auth)
)
