import React from 'react'
import { WithStyles, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { getStylesHeader } from 'src/utils/utils'
// used in header for each link
import { link } from './linkStyles'
const styles = () => ({ link })

interface OwnProps {
  to: string
  text: string
  underline?: boolean
  onClick?(...args: any): void
}
type TProps = OwnProps & WithStyles<typeof styles>
/** atom */
export const NavLink = withStyles(styles)(({ ...props }: TProps) => {
  return (
    <Link
      className={props.classes.link}
      to={props.to}
      style={props.underline ? { ...getStylesHeader(true) } : {}}
      onClick={props.onClick}
    >
      {props.text}
    </Link>
  )
})
