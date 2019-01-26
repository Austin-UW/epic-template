import React from 'react'
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  WithStyles,
  createStyles,
  withStyles
} from '@material-ui/core'

const styles = () =>
  createStyles({
    card: {
      maxWidth: 490,
      marginTop: 10,
      display: 'inline-block',
      marginLeft: 20,
      '&:first-child': {
        marginLeft: 0
      }
    },
    media: {
      height: 160
    }
  })

type CardProps = {
  fullName: string
  img: string
  description: string
  tag: string
} & WithStyles<typeof styles>

const MyCard = withStyles(styles)(
  ({ classes, fullName, img, description, tag }: CardProps) => (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="h6">
            <em style={{ fontSize: 17, color: 'gray' }}>"{description}"</em>
            <div style={{ textAlign: 'center', fontSize: 23, marginTop: 10 }}>
              {tag}
            </div>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" fullWidth>
          Subconsciously Agree
        </Button>
        <Button size="small" fullWidth variant="outlined" color="primary">
          Like
        </Button>
      </CardActions>
    </Card>
  )
)

export const UserTestimonials = () => (
  <div style={{ textAlign: 'center' }}>
    <MyCard
      tag="- Britney, Bitch"
      fullName="Dwight Schrute"
      description="KanbanBrawn is so epic, I have a very cool lair with a bunch of
              beans, I used KanbanBrawn and Nowadays, my Radiation Bunker
      is perfection"
      img="https://vignette.wikia.nocookie.net/theoffice/images/4/44/Dwights_blowgun.png/revision/latest?cb=20180607192911"
    />
    <MyCard
      description="KanbanBrawn is the coolest thing ive even seen, wow, its so amazing, I'm conrad kay and I approve :) Disclaimer: I have never eaten grass"
      tag="- Conrad Kay"
      fullName="Conrad Kay"
      img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDdUD8w6aWLL52WvXoUajJjIHruCszEvdW0ypqAziX9TT8FCE0qA"
    />
  </div>
)
