import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    card: {
        position: 'relative',
        //height: 350
    },
    media: {
        
    },
    overlay: {
        position: 'absolute',
        left: 10,
        top: 10,
        opacity: 0.6,
        backgroundColor: 'white',
        width: 400,
    }
});

const HeroUnit = (props) => {
    const { classes } = props;
    return (
        <div>
            <Card className={classes.card} align="center">
                <CardMedia
                    className={classes.media}
                    component="img"
                    alt="Mr. Wish Fish"
                    image="/static/images/close-up-dandelion-dandelion-seeds-51426.jpg"
                    title="Mr. Wish Fish">
                </CardMedia>
                <CardContent className={classes.overlay}>
                    <Typography variant="h6" align="center" color="textSecondary">
                        Mr. Wish Fish
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default withStyles(styles)(HeroUnit);