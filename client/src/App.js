import React, { Component } from 'react';
import './App.css';
import Home from './pages/MainNavigationTabs';

class App extends Component {
state = {
    data: null
  };

  render() {
    return (
      <div className="App">
          <h1 className="App-title">Rick and Morty</h1>
        <Home />
      </div>
    );
  }
}

export default App;