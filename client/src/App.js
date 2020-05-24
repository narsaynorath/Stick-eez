import React, { useState } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import DescriptionIcon from '@material-ui/icons/Description';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    color: '#5f6368',
    backgroundColor: 'white',
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    borderBottom: '1px solid lightgray'
  },
  toolbar: {
    paddingLeft: '4px'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
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
    whiteSpace: 'nowrap'
  },
  logo: {
    height: '36px',
    width: '36px',
    color: 'rgb(244, 181, 6)',
    marginRight: '4px',
  }
}));

function App() {
  const classes = useStyles();
  const [clickedOpen, setClickedOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawerOpen = (e) => {
    // Persist the drawer if clicked open, else toggle on mouse enter and exit
    if (e.type === "click") {
      setClickedOpen(!clickedOpen);
      setDrawerOpen(!drawerOpen);
    } else if (e.type === "mouseenter" && !clickedOpen) {
      setDrawerOpen(true);
    } else if (e.type === "mouseleave" && !clickedOpen) {
      setDrawerOpen(false);
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={toggleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <DescriptionIcon className={classes.logo} />
          <Typography variant="h6">
            Stick-eez
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          }),
        }}
        onMouseEnter={toggleDrawerOpen}
        onMouseLeave={toggleDrawerOpen}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <MenuIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}

export default App;
