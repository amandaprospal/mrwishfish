import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import HeroUnit from './components/HeroUnit';
import ButtonAppBar from './components/ButtonAppBar';

class App extends Component {
  render() {
    return (
        <React.Fragment>
          <CssBaseline />
          <div className="App">
            <ButtonAppBar />
            <HeroUnit />
          </div>
        </React.Fragment>
    );
  }
}

export default App;
