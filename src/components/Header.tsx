import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import MenuIcon from '@material-ui/icons/Menu'
import {
  Theme,
  WithStyles,
  createStyles,
  Button,
  Menu,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer
} from '@material-ui/core'
import { ProjectSearch } from './Home/ProjectSearch'
import { Trail } from 'react-spring'
import {
  HowToReg,
  Dvr,
  PieChart,
  Person,
  CalendarToday,
  Reorder,
  Add,
  Help
} from '@material-ui/icons'
import { Link as NavLink } from 'react-router-dom'
/**
 * @todo Refresh changing tab is kinda slow
 * @todo make it have a Drawer for the Header with all the different links on mobile (have a button as well as being swipable)
 */

const MenuItems = [
  {
    label: 'About',
    pathname: '/',
    menuIcon: Help
  },
  {
    label: 'Dashboard',
    pathname: '/dashboard',
    menuIcon: PieChart
  },
  {
    label: 'Create Project',
    pathname: '/create-project',
    menuIcon: Add
  },
  {
    label: 'Week View',
    pathname: '/week',
    menuIcon: Reorder
  },
  {
    label: 'Calendar',
    pathname: '/calendar',
    menuIcon: CalendarToday
  },
  {
    label: 'Tasks',
    pathname: '/tasks',
    menuIcon: Dvr
  },
  {
    label: 'Register',
    pathname: '/register',
    menuIcon: HowToReg
  },
  {
    label: 'Login',
    pathname: '/login',
    menuIcon: Person
  }
]

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
      boxShadow: 'none',
      borderBottom: `1px solid ${theme.palette.grey['100']}`,
      backgroundColor: 'white'
    },
    inline: {
      display: 'inline'
    },
    flex: {
      display: 'flex'
    },
    link: {
      textDecoration: 'none',
      color: 'inherit'
    },
    tagline: {
      display: 'inline-block',
      marginLeft: 10
    },
    iconContainer: {
      display: 'none',
      [theme.breakpoints.down('md')]: {
        display: 'block',
        marginLeft: 'auto'
      }
    },
    tabContainer: {
      marginLeft: 'auto',
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    },
    tabItem: {
      paddingTop: 20,
      paddingBottom: 20,
      minWidth: 'auto'
    },
    iconButton: {}
  })

const NewTab: any = Tab

class Topbar extends Component<
  WithStyles<typeof styles> & RouteComponentProps,
  { anchorEl: React.ReactNode; drawer: boolean }
> {
  state = {
    anchorEl: null,
    drawer: false
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { classes } = this.props

    return (
      <>
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Grid container spacing={24} alignItems="baseline">
              <Grid
                item
                xs={12}
                style={{ alignItems: 'baseline' }}
                className={classes.flex}
              >
                <Button
                  style={{
                    margin: 'auto 25px auto 0px',
                    paddingTop: 8,
                    paddingBottom: 8
                  }}
                  color="primary"
                  variant="outlined"
                  onClick={e => this.setState({ anchorEl: e.currentTarget })}
                >
                  <MenuIcon />
                  <span style={{ marginLeft: 5 }}>Projects</span>
                </Button>
                <Menu
                  anchorEl={this.state.anchorEl}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                >
                  <div style={{ outline: 'none', margin: 10 }}>
                    <ProjectSearch variant="menu" onClick={this.handleClose} />
                  </div>
                </Menu>
                <div className={classes.inline}>
                  <Typography variant="h6" color="inherit" noWrap>
                    <Trail
                      items={'Kanban Brawn'}
                      from={{ transform: 'translate3d(0,-40px,0)' }}
                      to={{ transform: 'translate3d(0,0px,0)' }}
                    >
                      {item => props => (
                        <a
                          target="_blank"
                          href="https://github.com/conradkay/KanbanBrawn"
                          style={{
                            ...props,
                            color: 'black',
                            textDecoration: 'none',
                            paddingRight: 5
                          }}
                          className={classes.tagline}
                        >
                          KanbanBrawn
                        </a>
                      )}
                    </Trail>
                  </Typography>
                </div>
                <React.Fragment>
                  <div className={classes.iconContainer}>
                    <IconButton
                      onClick={() => this.setState({ drawer: true })}
                      className={classes.iconButton}
                    >
                      <MenuIcon />
                    </IconButton>
                  </div>

                  <div className={classes.tabContainer}>
                    <Tabs
                      action={actions =>
                        setTimeout(actions.updateIndicator.bind(actions), 0)
                      }
                      value={MenuItems.map(
                        menuItem => menuItem.pathname
                      ).indexOf(this.props.location.pathname)}
                      indicatorColor="primary"
                      textColor="primary"
                    >
                      {MenuItems.map((item, index) => (
                        <NewTab
                          key={index}
                          component={(props: any) => (
                            <NavLink {...props} to={item.pathname} />
                          )}
                          classes={{ root: classes.tabItem }}
                          label={item.label}
                        />
                      ))}
                    </Tabs>
                  </div>
                </React.Fragment>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="right"
          open={this.state.drawer}
          onClose={() => this.setState({ drawer: false })}
        >
          <div style={{ width: 'auto' }}>
            <List>
              {MenuItems.map((menuItem, index) => (
                <ListItem
                  onClick={() => this.setState({ drawer: false })}
                  component={(props: any) => (
                    <NavLink to={menuItem.pathname} {...props} />
                  )}
                  button
                  key={index}
                >
                  <ListItemIcon>
                    <menuItem.menuIcon />
                  </ListItemIcon>
                  <ListItemText primary={menuItem.label} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      </>
    )
  }
}

const Routed = withRouter(Topbar)

export const Header = withStyles(styles)(Routed)
