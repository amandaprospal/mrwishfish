import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import compose from 'recompose/compose';
import auth0Client from '../../Auth';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
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
            wishlists: []
        };
    }

    componentDidMount() {
        this.getWishlists();
    }

    getWishlists() {
        var userId = auth0Client.getUserId();
        const _this = this;
        var getWishlistsEndpoint = 'http://' + process.env.REACT_APP_DOMAIN + ':8080/api/v1/wishlists/' + userId + '/wishlists';
        axios.get(getWishlistsEndpoint, {
            headers: { 
                'Authorization': `Bearer ${auth0Client.getIdToken()}`,
                "accepts": "application/json"
            }
        })
        .then(function (response) {
            _this.setState({
                wishlists: response.data.wishlists
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const { classes } = this.props;
        const { wishlists } = this.state;

        return (
            <main className={classes.main}>
                <CssBaseline />
                {
                    wishlists.map(wishlist => (
                        <Wishlist key={wishlist.id} wishlistId={wishlist.id} />
                    ))
                }
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