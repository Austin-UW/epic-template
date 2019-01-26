import React, { Component, ChangeEvent, FormEvent } from 'react'
import { connect } from 'react-redux'
import {
  Paper,
  Grid,
  Button,
  withStyles,
  WithStyles,
  Avatar,
  Typography,
  IconButton
} from '@material-ui/core'
import { LockOpen } from '@material-ui/icons'
import { formStyles } from '@components/styles/formStyles'
import { openSnackbarA } from '@store/actions/snackbar'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'

type DispatchProps = {
  openSnackbar: typeof openSnackbarA
}

type OwnProps = {
  authType: 'Register' | 'Login'
}

type TProps = WithStyles<typeof formStyles> & DispatchProps & OwnProps

const initialState = { email: '', password: '', confirm: '', username: '' }

export type AuthState = typeof initialState & {
  [index: string]: any
  email?: string
}

class Auth extends Component<TProps, AuthState> {
  state = initialState

  handleChange = (e: ChangeEvent<HTMLInputElement>) => (
    place: 'password' | 'email' | 'confirm' | 'username'
  ) => {
    this.setState({ [place]: e.target.value })
  }

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  render() {
    const { classes, authType } = this.props
    const { email, password, confirm } = this.state
    return (
      <div style={{ margin: 20 }}>
        <main className={classes.layout}>
          <form onSubmit={this.handleSubmit}>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOpen />
              </Avatar>
              <Typography style={{ fontSize: 17 }}>{authType}</Typography>
              {authType === 'Register' && (
                <Button
                  component={(props: any) => <Link {...props} to="/login" />}
                  variant="outlined"
                  style={{ marginTop: 10 }}
                >
                  Login Instead
                </Button>
              )}
              <TextField
                margin="dense"
                fullWidth
                required
                value={email}
                autoComplete="email"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  this.handleChange(e)('email')
                }
                label="Email"
                type="email"
              />
              {/* Full Name */}
              {authType === 'Register' && (
                <TextField
                  margin="dense"
                  fullWidth
                  required
                  autoComplete="username"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    this.handleChange(e)('username')
                  }
                  value={this.state.username}
                  label="Full Name"
                />
              )}
              {/* password */}
              <TextField
                margin="dense"
                fullWidth
                required
                label="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  this.handleChange(e)('password')
                }
                type="password"
              />
              {/* confirm password */}
              {authType === 'Register' && (
                <TextField
                  margin="dense"
                  fullWidth
                  required
                  label="Confirm Password"
                  error={confirm !== password}
                  autoComplete="current-password"
                  value={confirm}
                  type="password"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    this.handleChange(e)('confirm')
                  }
                />
              )}
              {/* submit button */}
              <Grid container justify="center" style={{ marginTop: '10px' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  type="submit"
                  style={{
                    marginTop: 10,
                    borderRadius: 0,
                    padding: '10px 10px',
                    textTransform: 'none'
                  }}
                >
                  {authType}
                </Button>
              </Grid>
              <Grid
                container
                style={{ marginTop: 15 }}
                alignContent="space-between"
              >
                <IconButton>
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png"
                    style={{ height: 50, width: 50 }}
                  />
                </IconButton>
                <IconButton style={{ marginLeft: 8 }}>
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/facebook_circle-512.png"
                    style={{ height: 50, width: 50 }}
                  />
                </IconButton>
                <IconButton style={{ marginLeft: 8 }}>
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png"
                    style={{ height: 50, width: 50 }}
                  />
                </IconButton>
                <IconButton style={{ marginLeft: 8 }}>
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/social-icons-5/607/Twitterbird.png"
                    style={{ height: 50, width: 50 }}
                  />
                </IconButton>
              </Grid>
            </Paper>
          </form>
        </main>
      </div>
    )
  }
}

const actionCreators: DispatchProps = {
  openSnackbar: openSnackbarA
}

export const AuthRender = withStyles(formStyles)(
  connect(
    null,
    actionCreators
  )(Auth)
)
