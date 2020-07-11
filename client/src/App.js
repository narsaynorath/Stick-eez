import React, { useEffect, useState } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CssBaseline from '@material-ui/core/CssBaseline';

import NavDrawer from './components/NavDrawer';
import MainToolbar from './components/MainToolbar';

import MainPage from './components/Main';
import Login from './components/Login';

import { getToken, removeUserSession } from './utils/common';
import { userContext } from './userContext';

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
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchNotes() {
      setLoading(true);
      fetch('http://localhost:5000/api/v1/notes/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            setNotes(data);
          }
        })
        .catch(error => {
          console.error('ERROR making API request');
          setNotes([]);
        });
      setLoading(false);
    }

    if (user) {
      fetchNotes();
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    setNotes([]);
    removeUserSession();
  };

  let content;
  if (loading) {
    content = <div>Loading...</div>;
  } else {
    content = (
      <Switch>
        <Route path="/" exact component={() => <MainPage notes={notes} />} />
        <Route path="/starred" component={Starred} />
        <Route path="/archived" component={Archived} />
        <Route path="/trash" component={Trash} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <userContext.Provider value={{ user, setUser, handleLogout }}>
      <div className={classes.root}>
        <CssBaseline />
        <userContext.Consumer>
          {({ handleLogout }) => (
            <MainToolbar
              toggleDrawer={toggleDrawer}
              handleLogout={handleLogout}
            />
          )}
        </userContext.Consumer>

        <NavDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {content}
        </main>

        <Modal open={!user}>
          <userContext.Consumer>
            {({ setUser }) => <Login setUser={setUser} />}
          </userContext.Consumer>
        </Modal>
      </div>
    </userContext.Provider>
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
