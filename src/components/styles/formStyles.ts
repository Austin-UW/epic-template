import { createStyles, Theme } from '@material-ui/core'

export const formStyles = (theme: Theme) =>
  createStyles({
    layout: {
      width: 'auto',
      [theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
        width: 500,
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column', // prevent all from being on one line
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
        .spacing.unit * 3}px`
    },
    avatar: {
      margin: theme.spacing.unit,
      width: 48,
      height: 48,
      backgroundColor: theme.palette.secondary.main
    },
    submit: {
      marginTop: theme.spacing.unit * 3
    }
  })
