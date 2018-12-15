import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Drawer as MaterialDrawer,
  ListItemIcon,
  withStyles,
  WithStyles
} from '@material-ui/core'
import { TState, MSProps } from 'src/types'
import { connect } from 'react-redux'
import { toggleA } from 'src/store'
import { Link } from 'react-router-dom'
import { Home, Menu } from '@material-ui/icons'

const styles = () => ({ root: { display: 'flex' } })
type StateProps = {
  open: boolean
}
type DispatchProps = {
  toggle: typeof toggleA
}
type TProps = WithStyles<typeof styles> & StateProps & DispatchProps
class DrawerComponent extends React.Component<TProps> {
  render() {
    const { toggle, open, classes } = this.props

    type Item = { name: string; to: string; icon: any }

    const navItemsNoAuth: Item[] = [{ name: 'Home', to: '/', icon: Home }]
    const navItemsWithAuth: Item[] = []
    const Display = ({ item }: { item: Item }) => {
      return (
        <ListItem
          component={(props: any) => <Link to={item.to} {...props} />}
          button
          onClick={() => toggle(false) /* make drawer close when clicking link */}
        >
          <ListItemIcon>{<item.icon />}</ListItemIcon>
          {this.props.open && <ListItemText primary={item.name} />}
        </ListItem>
      )
    }
    const fullList = (
      <div>
        <List disablePadding>
          <ListItem style={{ height: 47 }} button onClick={() => toggle(false)}>
            <ListItemIcon>
              <Menu />
            </ListItemIcon>
            <ListItemText primary="Back" />
          </ListItem>
          <Divider />
          {navItemsNoAuth.map((item: Item, i: number) => (
            <Display key={i} item={item} />
          ))}
          <Divider />
          {navItemsWithAuth.map((item: Item, i: number) => (
            <Display key={i} item={item} />
          ))}
        </List>
      </div>
    )

    return (
      <div className={classes.root}>
        <MaterialDrawer onClose={() => toggle(false)} open={open}>
          {/* allow you to close menu */}
          <div>{fullList}</div>
        </MaterialDrawer>
      </div>
    )
  }
}

const mapState: MSProps<StateProps> = (state: TState) => ({
  open: state.drawerOpen
})
export const Drawer = withStyles(styles)(
  connect(
    mapState,
    { toggle: toggleA }
  )(DrawerComponent)
)
