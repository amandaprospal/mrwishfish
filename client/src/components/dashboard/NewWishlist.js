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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { Switch } from '@material-ui/core';
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
  });

class NewWishlist extends Component {

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
        var apiHost = 'http://' + process.env.REACT_APP_DOMAIN + ':8080/api/v1/wishlists/';
        await axios.post(apiHost, {
            userId: auth0Client.getUserId(),
            name: this.state.name,
            isPrivate: this.state.isPrivate
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
                {/*<Typography variant="h4" gutterBottom component="h2">
                    Create New Wishlist
                </Typography>*/}
                <Paper className={classes.paper}>
                    {/*<Avatar className={classes.avatar}>
                    </Avatar>*/}
                    <GiftIcon />
                    <Typography component="h1" variant="h5">
                    Create New Wishlist
                    </Typography>
                    <form className={classes.form}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel>Name</InputLabel>
                        <Input id="name" name="name" autoFocus onBlur={(e) => {this.updateName(e.target.value)}}/>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.isPrivate}
                                onChange={(e) => {this.updateIsPrivate(e)}}
                                value="isPrivate"
                            />
                        }
                        label="This wishlist is private"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {this.submit()}}
                    >
                        Create Wishlist
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

NewWishlist.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default compose(
withStyles(styles)
)(withRouter(NewWishlist));

//export default withRouter(NewWishlist);