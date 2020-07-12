import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import DescriptionIcon from '@material-ui/icons/Description';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    color: '#5f6368',
    backgroundColor: 'white',
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    borderBottom: '1px solid lightgray',
  },
  toolbar: {
    paddingLeft: '4px',
  },
  logo: {
    height: '36px',
    width: '36px',
    color: 'rgb(244, 181, 6)',
    marginRight: '4px',
  },
  authenticationActions: {
    marginLeft: 'auto',
  },
}));

const MainToolbar = ({ handleLogout, toggleDrawer, user }) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Tooltip title="Main Menu" enterDelay={500} enterNextDelay={300}>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <DescriptionIcon className={classes.logo} />
        <Typography variant="h6" style={{ minWidth: 'max-content' }}>
          Stick-eez
        </Typography>
        {user && (
          <Typography
            variant="h6"
            style={{ width: '100%', textAlign: 'center' }}
          >
            Welcome, {user.username}!
          </Typography>
        )}
        <div className={classes.authenticationActions}>
          <Button
            variant="contained"
            style={{ backgroundColor: 'rgb(244, 181, 6)' }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MainToolbar;
