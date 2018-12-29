import React from 'react';
import auth0Client from '../../Auth';
import compose from 'recompose/compose';
import {withRouter} from 'react-router-dom';
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

function LandingAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
          Mr. Wish Fish
          </Typography>
          <Button
            color="inherit"
            onClick={auth0Client.signIn}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

LandingAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles)
)(withRouter(LandingAppBar));