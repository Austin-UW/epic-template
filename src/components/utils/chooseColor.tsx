import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core'

import React from 'react'

import { colors } from 'src/colors'
import uuidv1 from 'uuid/v1'

export class ChooseColor extends React.Component<{
  color: string
  onChange(color: string): void
}> {
  render() {
    return (
      <FormControl fullWidth>
        <InputLabel htmlFor="age-simple">Color</InputLabel>
        <Select
          fullWidth
          value={this.props.color || 'White'}
          onChange={e => this.props.onChange(e.target.value)}
        >
          {Object.values(colors).map((color: string, i) => (
            <MenuItem
              selected={false}
              style={{ backgroundColor: color }}
              key={uuidv1()}
              value={color}
            >
              {Object.keys(colors)[i]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
}
