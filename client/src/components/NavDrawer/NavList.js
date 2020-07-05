import React from 'react';
import { NavLink } from 'react-router-dom';

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

const NavList = () => {
  return (
    <List>
      {navItems.map(({ path, exact, text, icon: Icon }) => (
        <NavLink
          exact={exact}
          to={path}
          style={{ color: 'inherit', textDecoration: 'none' }}
          activeStyle={{
            color: 'green',
          }}
        >
          <ListItem button key={text}>
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
