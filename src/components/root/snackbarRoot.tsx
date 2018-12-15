import * as React from 'react'
import { TState, TVariant, MSProps } from 'src/types'
import {
  withStyles,
  createStyles,
  Theme,
  SnackbarContent,
  Snackbar,
  IconButton,
  WithStyles
} from '@material-ui/core'

import { connect } from 'react-redux'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import WarningIcon from '@material-ui/icons/Warning'
import ErrorIcon from '@material-ui/icons/Error'
import CloseIcon from '@material-ui/icons/Close'
import { closeSnackbarA } from 'src/store'

/**
 * @description used in snackbarRoot to determine how to display snackbar based on state.snackbar.variant
 * @returns {JSX inline style} whether or not to load an error icon with red or success + green etc.
 */
type Classes = { success: string; warning: string; error: string }
const getClassSnackbarVariant = (variant: TVariant, classes: Classes) => {
  if (variant === 'success') {
    return classes.success
  } else if (variant === 'warning') {
    return classes.warning
  } else if (variant === 'error') {
    return classes.error
  } else {
    return classes.error
  }
}

const styles = (theme: Theme) =>
  createStyles({
    success: { backgroundColor: '#43A047' }, // what a nice green
    warning: { backgroundColor: '#FFA000' },
    error: { backgroundColor: theme.palette.error.dark },
    close: { width: theme.spacing.unit * 3, height: theme.spacing.unit * 3 },
    message: { display: 'flex', alignItems: 'center' },
    icon: { fontSize: 20, marginRight: theme.spacing.unit }
  })

type StateProps = { message: string; open: boolean; variant: TVariant }
type DispatchProps = { closeSnackbar: typeof closeSnackbarA }
type TProps = WithStyles<typeof styles> & StateProps & DispatchProps

class SnackbarWrapComponent extends React.Component<TProps> {
  render() {
    // Find what Icon to use for snackbar by variant
    const variantIcon: any = {
      success: CheckCircleIcon,
      warning: WarningIcon,
      error: ErrorIcon
    }
    const { classes, open, message, variant } = this.props
    // will either return classes.success/classes.warning/classes.error
    const backgroundClass: any = getClassSnackbarVariant(variant, classes)

    const Icon = variantIcon[variant]
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        autoHideDuration={2000}
        onClose={this.props.closeSnackbar}
      >
        <SnackbarContent
          className={backgroundClass}
          message={
            <span className={classes.message}>
              <Icon className={classes.icon} />
              <span style={{ marginLeft: 15, fontSize: 15 }}>{message}</span>
            </span>
          }
          action={[
            <IconButton
              key="close"
              color="inherit"
              className={classes.icon}
              onClick={this.props.closeSnackbar}
            >
              <CloseIcon className={classes.close} />
            </IconButton>
          ]}
        />
      </Snackbar>
    )
  }
}
const mapStateToProps: MSProps<StateProps> = ({ snackbar }: TState) => ({
  open: snackbar.open,
  message: snackbar.message,
  variant: snackbar.variant
})
const mapDispatchToProps: DispatchProps = {
  closeSnackbar: closeSnackbarA
}

export const SnackbarRoot = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SnackbarWrapComponent))
