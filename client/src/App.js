import React, { Component } from 'react';
import auth0Client from './Auth';
import Callback from './Callback';
import CssBaseline from '@material-ui/core/CssBaseline';
import HeroUnit from './components/HeroUnit';
import {withRouter, Route} from 'react-router-dom';
import ButtonAppBar from './components/ButtonAppBar';
import NewWishlist from './NewWishlist';
import SecuredRoute from './SecuredRoute';

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
            <ButtonAppBar />
            {/*<HeroUnit />*/}
            <Route exact path='/callback' component={Callback} />
            <SecuredRoute path='/newwishlist' component={NewWishlist} checkingSession={this.state.checkingSession}/>
          </div>
        </React.Fragment>
    );
  }
}

export default withRouter(App);
