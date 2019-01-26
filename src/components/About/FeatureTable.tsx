import React from 'react'
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core'
import { Check, Close, Traffic } from '@material-ui/icons'

const tableHeadData: string[] = [
  'Feature',
  'KanbanBrawn',
  'Trello',
  'KanbanFlow'
]

const features = [
  // first in array is feature name, second is for kanbanBrawn, third is trello, fourth is kanbanFlow
  ['Subtasks', 'CHECK', 'CHECK', 'CHECK'],
  ['EPIC DESIGN', 'Material', 'Minimal', 'Nice'],
  ['Multiple Projects', 'CHECK', 'CHECK', 'CHECK'],
  ['Swimlanes', 'WIP', 'PRO', 'PRO'],
  ['Filtering', 'WIP', 'CHECK', 'CHECK'],
  ['Recurring Tasks', 'WIP', 'CHECK', 'CHECK'],
  ['Collapse Columns', 'WIP', 'CHECK', 'NO'],
  ['Mobile Friendly', 'WIP', 'CHECK', 'CHECK'],
  ['Attach Photos', 'NO', 'PRO', 'CHECK'],
  ['Comments', 'WIP', 'NO', 'CHECK'],
  ['Links', 'WIP', 'NO', 'CHECK'],
  ['Export as JSON', 'WIP', 'NO', 'NO']
]

export const FeatureTable = () => (
  <Paper style={{ maxWidth: 1000, marginBottom: 20, marginTop: 20, marginLeft: 'auto', marginRight: 'auto' }}>
    <Table>
      <TableHead>
        <TableRow>
          {tableHeadData.map((val, i) => (
            <TableCell key={i}>{val}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {features.map((feature, i) => (
          <TableRow key={i}>
            {feature.map((val, e) => (
              <TableCell key={e}>
                {val === 'CHECK' ? (
                  <Check style={{ color: '#00CC00' }} />
                ) : val === 'NO' ? (
                  <Close style={{ color: '#cc0000' }} />
                ) : val === 'WIP' ? (
                  <Traffic style={{ color: 'orange' }} />
                ) : val === 'PRO' ? (
                  'Premium'
                ) : (
                  val
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
)
