import React from 'react';
import auth0Client from '../Auth';
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
            <Button
              color="inherit"
              onClick={() => {signOut()}}>
              {auth0Client.getProfile().name} Logout
            </Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);