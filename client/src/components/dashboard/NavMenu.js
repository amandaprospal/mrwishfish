import React from 'react';
import auth0Client from '../../Auth';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class NavMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            };
    }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  signOut = () => {
    this.setState({ anchorEl: null });
    auth0Client.signOut();
    this.props.history.replace('/');
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          color="inherit"
          onClick={this.handleClick}
        >
          {auth0Client.getProfile().name}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My Account</MenuItem>
          <MenuItem color="inherit" onClick={this.signOut}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default NavMenu;