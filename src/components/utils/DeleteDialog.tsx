import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Button,
  Theme,
  createStyles,
  WithStyles,
  IconButton,
  withStyles,
  DialogTitle,
  TextField,
  Grid
} from '@material-ui/core'
import { Close } from '@material-ui/icons'

type TProps = OwnProps & WithStyles<typeof styles>

interface OwnProps {
  id: number
  name: 'Project' | 'Column'
  inputName?: string
  onClose(): void
  deleteFunc(id: number): void
}

const styles = (theme: Theme) =>
  createStyles({
    closeButton: {
      position: 'absolute',
      right: theme.spacing.unit,
      top: theme.spacing.unit,
      color: theme.palette.grey[500]
    }
  })

class CDeleteColumnDialog extends React.Component<TProps, { confirm: string }> {
  state = { confirm: '' }
  onSubmit = () => {
    this.props.deleteFunc(this.props.id)
    this.props.onClose() // need this so it doesn't delete another column
  }
  render() {
    const { onClose, classes, name, inputName } = this.props
    return (
      <Dialog open={true} onClose={onClose}>
        <DialogTitle>Delete {inputName ? inputName : name}</DialogTitle>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <Close />
        </IconButton>
        <DialogContent>
          <DialogContentText>
            Deleted {name} cannot be restored. Are you sure about this?
          </DialogContentText>
        </DialogContent>
        <div
          style={{
            margin: 8
          }}
        >
          {typeof inputName === 'string' && (
            <TextField
              style={{ margin: 4, marginBottom: 20 }}
              fullWidth
              value={this.state.confirm}
              onChange={e => this.setState({ confirm: e.target.value })}
              label={`Please type in the name of the ${name} to confirm.`}
            />
          )}
          <Grid container spacing={16}>
            <Grid item md={6}>
              <Button fullWidth onClick={onClose} color="secondary">
                Cancel
              </Button>
            </Grid>
            <Grid item md={6}>
              <Button
                onClick={this.onSubmit}
                fullWidth
                disabled={inputName ? this.state.confirm !== inputName : false}
                variant="contained"
                color="primary"
              >
                Delete {name}
              </Button>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    )
  }
}

export const DeleteDialog = withStyles(styles)(CDeleteColumnDialog)
