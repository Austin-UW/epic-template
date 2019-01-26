import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  withStyles,
  WithStyles,
  createStyles,
  Theme
} from '@material-ui/core'

import React from 'react'

import { Link } from 'react-router-dom'

const tiers: Array<{
  title: string
  price: string
  description: string[]
  buttonText: string
  buttonVariant: any
  subheader?: string
}> = [
  {
    title: 'Free',
    price: '0',
    description: [
      'So yeah this is KanbanBrawn, Welcome',
      'My name is Conrad Kay and I thoroughly approve this app',
      'I made it too so that could be an important factor in my decision...',
      'On how darn epic of a devloper I am ;P'
    ],
    buttonText: 'Make Conrad Kay Give you 4 claps :POGCHAMP:',
    buttonVariant: 'outlined'
  },
  {
    title: 'Also Free',
    subheader: 'Most popular',
    price: '0',
    description: [
      'If you get bugs just tell me or open up an issue man',
      '#1 Customer support',
      'Help center access',
      'A sense of development as a person'
    ],
    buttonText: 'Register',
    buttonVariant: 'contained'
  },
  {
    title: 'Its Free Man',
    price: '0',
    description: [
      'I told you so, this is epic!',
      'Yeah you can export as JSON and just store it across computers.',
      'If you are a backendy boysenburry please help',
      'Just like login and storing tasks as JSON in database HALP JK im epic'
    ],
    buttonText: 'Become a HypeBeast',
    buttonVariant: 'outlined'
  }
]

const styles = (theme: Theme) =>
  createStyles({
    cardHeader: {
      backgroundColor: theme.palette.grey[200]
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing.unit * 2
    },
    cardActions: {
      [theme.breakpoints.up('sm')]: {
        paddingBottom: theme.spacing.unit * 2
      }
    }
  })

export const Pricing = withStyles(styles)(
  ({ classes }: WithStyles<typeof styles>) => (
    <Grid
      container
      alignItems="center"
      spacing={32}
      style={{ maxWidth: 1400, marginLeft: 'auto', marginRight: 'auto' }}
    >
      {tiers.map(tier => (
        <Grid
          item
          key={tier.title}
          xs={12}
          sm={tier.title === 'Also Free' ? 12 : 6}
          md={4}
        >
          <Card>
            <CardHeader
              title={tier.title}
              subheader={tier.subheader}
              titleTypographyProps={{ align: 'center' }}
              subheaderTypographyProps={{ align: 'center' }}
              className={classes.cardHeader}
            />
            <CardContent>
              <div className={classes.cardPricing}>
                <Typography component="h2" variant="h3" color="textPrimary">
                  ${tier.price}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  /mo
                </Typography>
              </div>
              {tier.description.map(line => (
                <Typography variant="subtitle1" align="center" key={line}>
                  {line}
                </Typography>
              ))}
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button
                fullWidth
                component={(linkProps: any) => (
                  <Link {...linkProps} to="/register" />
                )}
                variant={tier.buttonVariant}
                color="primary"
              >
                {tier.buttonText}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
)
