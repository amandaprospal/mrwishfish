import React from 'react';
import auth0Client from '../Auth';
import compose from 'recompose/compose';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  }
};

function ButtonAppBar(props) {
  const { classes } = props;

  const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Mr. Wish Fish
          </Typography>
          {
            !auth0Client.isAuthenticated() &&
            <Button
              color="inherit"
              onClick={auth0Client.signIn}>
              Login
            </Button>
          }
          {
            auth0Client.isAuthenticated() &&
            <div>
              {auth0Client.getProfile().name}
              <Button
              color="inherit"
              onClick={() => {signOut()}}>
              Logout
            </Button>
            </div>
          }
          {
            auth0Client.isAuthenticated() &&
            <div>
              <Button
              color="inherit"
              component={Link} to="/newwishlist"
              >
              New Wishlist
            </Button>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles)
)(withRouter(ButtonAppBar));