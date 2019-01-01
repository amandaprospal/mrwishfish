import React, {Component} from 'react';
import auth0Client from '../../Auth';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import WishlistItems from './WishlistItems';
import {NavLink, withRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id: '',
        name: ''
    };
  }

  componentDidMount() {
    this.getWishlist();
  }

  getWishlist() {
    var wishlistID = this.props.wishlistId;
    const _this = this;
    var getWishlistEndpoint = 'http://' + process.env.REACT_APP_DOMAIN + ':8080/api/v1/wishlists/' + wishlistID;
    axios.get(getWishlistEndpoint, {
        headers: { 
            'Authorization': `Bearer ${auth0Client.getIdToken()}`,
            "accepts": "application/json"
        }
    })
    .then(function (response) {
        _this.setState({
            id: response.data.wishlist.id,
            name: response.data.wishlist.name
        });
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  render() {  
    const {classes} = this.props;
    return (
        <React.Fragment>
          <Typography variant="h4" gutterBottom component="h2">
            {this.state.name}
          </Typography>
          <Button variant="contained" color="secondary" className={classes.button} component={NavLink} to={`/newwishlistitem/${this.props.wishlistId}`}>
            Add New Item
          </Button>
          <WishlistItems wishlistId={this.props.wishlistId}/>
        </React.Fragment>
    );
  }

}

Wishlist.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
withStyles(styles)
)(withRouter(Wishlist));