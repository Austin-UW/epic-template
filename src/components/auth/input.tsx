import React from 'react'
import { styles } from '../styles/form'
import { withStyles, WithStyles, Grid, TextField } from '@material-ui/core'
import { Change } from 'src/types'

type OwnProps = {
  handleChange: (e: Change) => void
  Icon: any
  value: string
  label: string
  type?: 'email' | 'password'
  autoFocus?: true
  autoComplete?: string
}
type TProps = WithStyles<typeof styles> & OwnProps
export const Input = withStyles(styles)(({ ...props }: TProps) => {
  const { Icon, handleChange, value, autoFocus, type, label, autoComplete } = props
  return (
    <Grid container spacing={8} alignItems="flex-end" style={{ marginTop: 5 }}>
      <Grid item>
        <Icon />
      </Grid>
      <Grid item md={true}>
        <TextField
          autoComplete={autoComplete}
          onChange={handleChange}
          value={value}
          label={label}
          fullWidth
          type={type}
          autoFocus={autoFocus}
          required
        />
      </Grid>
    </Grid>
  )
})
