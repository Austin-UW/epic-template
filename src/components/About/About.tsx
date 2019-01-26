import React from 'react'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Typography, WithStyles } from '@material-ui/core'
import { FeatureTable } from './FeatureTable'
import { AboutFooter } from './Footer'
import { UserTestimonials } from './UserTestimonials'
import { Pricing } from './Pricing'

const styles = (theme: Theme) =>
  createStyles({
    heroContent: {
      margin: '0 auto',
      backgroundImage:
        'url("http://www.cliftonrubber.co.uk/wp-content/themes/clifton-rubber/images/ourcompany-background.jpg")',
      height: '48vh',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative',
      marginBottom: 20
    }
  })

type TProps = WithStyles<typeof styles>

export const About = withStyles(styles)((props: TProps) => {
  const { classes } = props

  return (
    <div>
      <div className={classes.heroContent}>
        <Typography
          variant="h2"
          style={{
            fontSize: 64,
            color: 'white',
            textAlign: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          KanbanBrawn
        </Typography>
      </div>
      <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
        Pricing
      </Typography>
      <Pricing />
      <Typography
        style={{ marginTop: 20 }}
        variant="h4"
        align="center"
        color="textPrimary"
      >
        Features
      </Typography>
      <FeatureTable />
      <Typography
        style={{ marginTop: 20 }}
        variant="h4"
        align="center"
        color="textPrimary"
      >
        They Love It
      </Typography>
      <UserTestimonials />
      <AboutFooter />
    </div>
  )
})
