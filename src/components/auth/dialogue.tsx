import React, { Component } from 'react'
import { ButtonLink } from '..'
import { TAuthType } from 'src/types'

type OwnProps = { authType: TAuthType }
type State = { phone: string; valid: boolean }
/** Molecule */
export class ActionDialogue extends Component<OwnProps, State> {
  state = { phone: '', valid: false }
  render() {
    const { authType } = this.props

    if (authType === 'Register') {
      return <ButtonLink text="Login Instead" to="/login" variant="outlined" style={{ marginTop: 10 }} />
    } else {
      return null
    }
  }
}
