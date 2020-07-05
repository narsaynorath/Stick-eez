import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import MUIDrawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';

import NavList from './NavList';

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

const NavDrawer = ({ open, toggleDrawer }) => {
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
        <NavList />
      </div>
    </MUIDrawer>
  );
};

export default NavDrawer;
