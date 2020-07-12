import React, { useEffect, useState } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/core/styles';

import NavDrawer from './components/NavDrawer';
import MainToolbar from './components/MainToolbar';

import Login from './components/Login';
import MainPage from './components/Main';
import NoteForm from './components/NoteForm';

import { getToken, getUser, removeUserSession } from './utils/common';
import { userContext } from './userContext';
import { theme } from './theme';

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
  newNoteField: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '32px auto 16px auto',
  },
}));

function App() {
  const classes = useStyles();
  const [clickedOpen, setClickedOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [addingNote, setAddingNote] = useState(false);
  const [user, setUser] = useState(getUser());

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
      <div>
        <div className={classes.newNoteField}>
          {addingNote ? (
            <NoteForm
              setAddingNote={setAddingNote}
              notes={notes}
              setNotes={setNotes}
              style={{ maxHeight: 'min-content', maxWidth: '600px' }}
            />
          ) : (
            <TextField
              variant="outlined"
              placeholder="Take a note..."
              onClick={() => setAddingNote(true)}
              style={{ width: '100%', maxWidth: '600px', background: '#fff' }}
            />
          )}
        </div>
        <Switch>
          <Route path="/" exact component={() => <MainPage notes={notes} />} />
          <Route path="/starred" component={Starred} />
          <Route path="/archived" component={Archived} />
          <Route path="/trash" component={Trash} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <userContext.Provider value={{ user, setUser, handleLogout }}>
        <div className={classes.root}>
          <CssBaseline />
          <MainToolbar
            toggleDrawer={toggleDrawer}
            user={user}
            handleLogout={handleLogout}
          />

          <NavDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />

          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {content}
          </main>

          <Modal open={!user} style={{ display: 'flex', alignItems: 'center' }}>
            <Login setUser={setUser} />
          </Modal>
        </div>
      </userContext.Provider>
    </ThemeProvider>
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
