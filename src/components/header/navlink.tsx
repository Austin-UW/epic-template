import React, { CSSProperties } from 'react'
import { WithStyles, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
// used in header for each link
import { link } from './linkStyles'
const styles = () => ({ link })

export const getStylesHeader = (conditionTrue: boolean): CSSProperties => {
  // whether or not to underline text in header
  if (conditionTrue) {
    return { textDecoration: 'underline' }
  } else {
    return {}
  } // no styles
}

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
      style={getStylesHeader(props.underline || false)}
      onClick={props.onClick}
    >
      {props.text}
    </Link>
  )
})
