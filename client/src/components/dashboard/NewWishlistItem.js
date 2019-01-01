import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import compose from 'recompose/compose';
import auth0Client from '../../Auth';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
//import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import GiftIcon from '@material-ui/icons/Redeem';

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
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
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    }
  });

class NewWishlistItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            wishlist_id: '',
            name: '',
            price: '',
            item_url: '',
            image_url: '',
            is_purchased: '',
            disabled: false
        };

        
    }

    componentDidMount() {
        var wishlistId = this.props.match.params.wishlistId;
        this.setState({
            wishlist_id: wishlistId,
            disabled: true
        });
    }

    updateName(value) {
        this.setState({
            name: value
        });
    }

    updatePrice(value) {
        this.setState({
            price: value
        });
    }

    updateItemUrl(value) {
        /*const images = value;
        const formData = new FormData();

        images.forEach((image, i) => {
            formData.append(i, image);
        });*/

        this.setState({
            image_url: value
        });
    }

    async submit() {
        this.setState({
            disabled: true
        });

        var apiHost = 'http://' + process.env.REACT_APP_DOMAIN + ':8080/api/v1/wishlists/' + this.state.wishlist_id + '/items';
        await axios.post(apiHost, {
            name: this.state.name,
            price: this.state.price,
            itemUrl: this.state.item_url,
            imageUrl: this.state.images,
            isPurchase: false
        }, {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}`,
            "accepts": "application/json" }
        });

        this.props.history.push('/');
    }

    render() {
        const { classes } = this.props;
        
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <GiftIcon />
                    <Typography component="h1" variant="h5">
                    Add Wishlist Item
                    </Typography>
                    <form className={classes.form}>

                    <FormControl margin="normal" required fullWidth>
                        <InputLabel>Name</InputLabel>
                        <Input id="name" name="name" autoFocus onBlur={(e) => {this.updateName(e.target.value)}}/>
                    </FormControl>

                    <FormControl margin="normal" required fullWidth>
                        <InputLabel>Price</InputLabel>
                        <Input id="price" name="price" onBlur={(e) => {this.updatePrice(e.target.value)}}/>
                    </FormControl>

                    <FormControl margin="normal" fullWidth>
                        <InputLabel>Item URL</InputLabel>
                        <Input id="itemUrl" name="itemUrl" onBlur={(e) => {this.updateItemUrl(e.target.value)}}/>
                    </FormControl>
                    {/*
                    <FormControl margin="normal" fullWidth>
                        <Input 
                            id="imageUrl" 
                            name="imageUrl" 
                            accept="image/*"
                            className={classes.input}
                            multiple
                            type="file"
                            onChange={(e) => {this.updateItemUrl(e.target.files)}}/>
                        <label htmlFor="imageUrl">
                            <Button variant="contained" component="span" className={classes.button}>
                            Upload Image
                            </Button>
                        </label>
                    </FormControl>
                    */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {this.submit()}}
                    >
                        Add Item to Wishlist
                    </Button>
                    </form>
                </Paper>
            </main>

            /*
            <div className="container">
                <div className="row">
                <div className="col-12">
                    <div className="card border-primary">
                    <div className="card-header">New Wishlist</div>
                    <div className="card-body text-left">
                        <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name:</label>
                        <input
                            disabled={this.state.disabled}
                            type="text"
                            onBlur={(e) => {this.updateName(e.target.value)}}
                            className="form-control"
                            placeholder="Name"
                        />
                        </div>
                        <button
                        disabled={this.state.disabled}
                        className="btn btn-primary"
                        onClick={() => {this.submit()}}>
                        Submit
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>*/
        );
    }
}

NewWishlistItem.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default compose(
withStyles(styles)
)(withRouter(NewWishlistItem));

//export default withRouter(NewWishlist);