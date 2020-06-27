import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import MUIDrawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  open: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  close: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
  },
}));

const Drawer = ({ open, toggleDrawer }) => {
  const classes = useStyles();
  return (
    <MUIDrawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.open]: open,
        [classes.close]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.open]: open,
          [classes.close]: !open,
        }),
      }}
      onMouseEnter={toggleDrawer}
      onMouseLeave={toggleDrawer}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {['Notes', 'Starred', 'Archived', 'Trash'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <MenuIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    </MUIDrawer>
  );
};

export default Drawer;
