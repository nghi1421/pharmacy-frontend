import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { List, ListItem } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useStyles } from '../themes/LinkTheme'
import { dashboardRoutes } from '../routes';
import { Route } from '../types/Route';

const MyNavLink = React.forwardRef<any, any>((props, ref) => (
  <NavLink
    ref={ref}
    to={props.to}
    className={({ isActive }) => `${props.className} ${isActive ? props.activeClassName : props.linkClassName}`}
  >
    {props.children}
  </NavLink>
));

export const SideBar: React.FC = () =>{
  const classes = useStyles();
  return (
    <List>
      { dashboardRoutes.map((route: Route) => (
          <ListItem
            component={MyNavLink}
            to={route.path}
            activeClassName={classes.activeLink}
            linkClassName={classes.linkClass}
          >
            <ListItemIcon>
              <route.icon />
            </ListItemIcon>
            <ListItemText primary={route.title} />
          </ListItem>
        ))
      }
    </List>
)};
