import React from 'react';
import auth0Client from '../../Auth';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
      heroUnit: {
        backgroundColor: theme.palette.background.paper,
        opacity: 0.55,
      },
      heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
      },
      heroButtons: {
        marginTop: theme.spacing.unit * 4,
      },
      layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
          width: 1100,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        paddingTop: '56.25%', // 16:9
      },
      cardContent: {
        flexGrow: 1,
      },
      main: {
        height: '100%',
        backgroundImage: `url(${"static/images/astronomy-backlit-blue-mountains-1434608.jpg"})`
      },
      "@global": {
        body: {
          backgroundImage: "url('static/images/astronomy-backlit-blue-mountains-1434608.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          height: "100%"
        },
        html: {
          height: "100%"
        },
        "#componentWithId": {
          height: "100%"
        }
      },
});

const HeroUnit = (props) => {
    const { classes } = props;
    return (
       <React.Fragment>
        <CssBaseline />

        <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary">
             Mr. Wish Fish
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              A better wishlist.
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Mr. Wish Fish is an online wishlist management tool that enables you to easily manage and curate wishlists to share with your family and friends.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={auth0Client.signIn}>
                    Sign Up
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={auth0Client.signIn}>
                    Log In
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
    </div>
        {/* End hero unit */}
      </main>
    </React.Fragment>
    );
}

export default withStyles(styles)(HeroUnit);