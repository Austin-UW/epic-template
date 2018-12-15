import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

type ButtonProps = {
  variant: 'contained' | 'outlined'
  to: string
  text: string
  style?: object
}
/** atom */
export const ButtonLink = (props: ButtonProps) => (
  <Button
    component={(linkProps: any) => <Link to={props.to} {...linkProps} />}
    variant={props.variant}
    color="primary"
    size="large"
    style={typeof props.style === 'object' ? props.style : {}}
  >
    {props.text}
  </Button>
)
