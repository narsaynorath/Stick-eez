import React, { useState } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import NavDrawer from './components/NavDrawer';
import MainToolbar from './components/MainToolbar';

import MainPage from './components/Main';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  toolbar: {
    paddingLeft: '4px',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  contentMain: {
    padding: '32px',
  },
}));

function App() {
  const classes = useStyles();
  const [clickedOpen, setClickedOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MainToolbar toggleDrawer={toggleDrawer} />

      <NavDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/starred" component={Starred} />
          <Route path="/archived" component={Archived} />
          <Route path="/trash" component={Trash} />
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );

  function toggleDrawer(e) {
    // Persist the drawer if clicked open, else toggle on mouse enter and exit
    if (e.type === 'click') {
      setClickedOpen(!clickedOpen);
      setDrawerOpen(!drawerOpen);
    } else if (e.type === 'mouseenter' && !clickedOpen) {
      setDrawerOpen(true);
    } else if (e.type === 'mouseleave' && !clickedOpen) {
      setDrawerOpen(false);
    }
  }

  // TODO Break these out into components
  function Starred() {
    return <div className={classes.contentMain}>Starred content!!!</div>;
  }

  function Archived() {
    return <div className={classes.contentMain}>Archived Content!</div>;
  }

  function Trash() {
    return <div className={classes.contentMain}>Sendit</div>;
  }
}

export default App;
