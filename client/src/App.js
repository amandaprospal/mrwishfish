import React, { Component } from 'react';
import auth0Client from './Auth';
import Callback from './Callback';
import CssBaseline from '@material-ui/core/CssBaseline';
import HeroUnit from './components/homepage/HeroUnit';
import {withRouter, Route} from 'react-router-dom';
import LandingAppBar from './components/homepage/HomePageAppBar';
import Dashboard from './components/dashboard/Dashboard';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false});
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});
  }

  render() {
    return (
        <React.Fragment>
          <CssBaseline />
          <div className="App">
            {
              !auth0Client.isAuthenticated() &&
              <div>
                <LandingAppBar />
                {<HeroUnit />}
              </div>
            }
            {
              auth0Client.isAuthenticated() &&
              <Dashboard />
            }

            <Route exact path='/callback' component={Callback} />
            
          </div>
        </React.Fragment>
    );
  }
}

export default withRouter(App);
