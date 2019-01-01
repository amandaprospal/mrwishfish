import React from 'react';
import {NavLink} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PlaylistIcon from '@material-ui/icons/PlaylistAdd';
import GiftIcon from '@material-ui/icons/Redeem';

export const mainListItems = (
  <div>
    <ListItem button component={NavLink} to="/mywishlist">
        <ListItemIcon>
        <GiftIcon />
        </ListItemIcon>
        <ListItemText inset primary="My Wishlists" />
    </ListItem>

    <ListItem button component={NavLink} to="/newwishlist">
        <ListItemIcon>
        <PlaylistIcon />
        </ListItemIcon>
        <ListItemText inset primary="Create Wishlist" />
    </ListItem>
  </div>
);