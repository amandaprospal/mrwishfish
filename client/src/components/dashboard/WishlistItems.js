import React, {Component} from 'react';
import auth0Client from '../../Auth';
import axios from 'axios';
import compose from 'recompose/compose';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ListSubheader from '@material-ui/core/ListSubheader';
import {withRouter} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      //backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 600,
      //height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  });

class WishlistItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.getItems();
    }

    getItems() {
        var wishlistID = this.props.wishlistId;
        const _this = this;
        var getWishlistItemsEndpoint = 'http://' + process.env.REACT_APP_DOMAIN + ':8080/api/v1/wishlists/' + wishlistID + '/items';
        axios.get(getWishlistItemsEndpoint, {
            headers: { 
                'Authorization': `Bearer ${auth0Client.getIdToken()}`,
                "accepts": "application/json"
            }
        })
        .then(function (response) {
            _this.setState({
                items: response.data.wishlistItems
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const { classes } = this.props;
        const { items } = this.state;

        return (
            <div className={classes.root}>
                {
                    items.length === 0 ?
                    <div>
                    No items in this wishlist
                    </div>
                    :
                    <GridList cellHeight={230} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                        <ListSubheader component="div"></ListSubheader>
                    </GridListTile>
                    {items.map(tile => (
                        <GridListTile key={tile.id}>
                        <img src={tile.imageUrl} alt={tile.name} />
                        <GridListTileBar
                            title={tile.name}
                            subtitle={<span>${tile.price}</span>}
                            actionIcon={
                            <IconButton target="_blank" href={tile.itemUrl} className={classes.icon}>
                                <InfoIcon />
                            </IconButton>
                            }
                        />
                        </GridListTile>
                    ))}
                    </GridList>
                }
                

            </div>
        );
    }
}

export default compose(
    withStyles(styles)
    )(withRouter(WishlistItems));