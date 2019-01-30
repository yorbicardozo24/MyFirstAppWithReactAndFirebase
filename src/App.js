import React, { Component } from 'react';
import './App.css';
import { withStyles } from '@material-ui/core/styles';

import AppNav from './components/AppNav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNav />
      </div>
    );
  }
}

export default App;
