import React from 'react';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteIcon from '@material-ui/icons/Delete';
import DescriptionIcon from '@material-ui/icons/Description';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';

const navItems = [
  {
    path: '/',
    exact: true,
    text: 'Notes',
    icon: DescriptionIcon,
  },
  {
    path: 'starred',
    text: 'Starred',
    icon: StarIcon,
  },
  {
    path: 'archived',
    text: 'Archived',
    icon: ArchiveIcon,
  },
  {
    path: 'trash',
    text: 'Trash',
    icon: DeleteIcon,
  },
];

const useStyles = makeStyles(theme => ({
  listItem: {
    backgroundColor: 'inherit',
  },
}));

const NavList = () => {
  const classes = useStyles();

  return (
    <List>
      {navItems.map(({ path, exact, text, icon: Icon }) => (
        <NavLink
          exact={exact}
          to={path}
          style={{ color: 'inherit', textDecoration: 'none' }}
          activeStyle={{
            backgroundColor: 'rgba(244, 181, 6, 0.5)',
          }}
        >
          <ListItem key={text} className={classes.listItem}>
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        </NavLink>
      ))}
    </List>
  );
};

export default NavList;
