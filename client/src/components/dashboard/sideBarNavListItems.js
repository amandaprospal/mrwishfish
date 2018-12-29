import React from 'react';
import {NavLink} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PlaylistIcon from '@material-ui/icons/PlaylistAdd';
import GiftIcon from '@material-ui/icons/Redeem';
import ShareIcon from '@material-ui/icons/Share';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
  <div>
    <ListItem button component={NavLink} to="/mywishlist">
        <ListItemIcon>
        <GiftIcon />
        </ListItemIcon>
        <ListItemText inset primary="My Wishlist" />
    </ListItem>

    <ListItem button component={NavLink} to="/newwishlist">
        <ListItemIcon>
        <PlaylistIcon />
        </ListItemIcon>
        <ListItemText inset primary="Create Wishlist" />
    </ListItem>

    <ListItem button component={NavLink} to="/newwishlistitem">
        <ListItemIcon>
        <PlaylistIcon />
        </ListItemIcon>
        <ListItemText inset primary="Add Item" />
    </ListItem>

    <ListItem button>
        <ListItemIcon>
        <ShareIcon />
        </ListItemIcon>
        <ListItemText inset primary="Share" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);