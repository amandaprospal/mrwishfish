import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import compose from 'recompose/compose';
import auth0Client from '../../Auth';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Wishlist from './Wishlist';

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      //marginLeft: theme.spacing.unit * 3,
      //marginRight: theme.spacing.unit * 3,
      /*[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },*/
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });

class MyWishlist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
            name: '',
            isPrivate: false
        };
    }

    updateName(value) {
        this.setState({
            name: value
        });
    }

    updateIsPrivate(event) {
        this.setState({
            isPrivate: event.target.checked
        });
    }

    async submit() {
        this.setState({
            disabled: true
        });

        await axios.post('http://localhost:8080/api/v1/wishlists/', {
            userId: 1,
            name: this.state.name,
            isPrivate: this.state.isPrivate
        }, {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        });

        this.props.history.push('/');
    }

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Typography variant="h4" gutterBottom component="h2">
                    My Wishlist
                </Typography>
                <Wishlist />
            </main>
        );
    }
}

MyWishlist.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default compose(
withStyles(styles)
)(withRouter(MyWishlist));