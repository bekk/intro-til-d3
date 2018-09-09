import React, { Component } from 'react';
import './App.css';
import SteamGraph from './SteamGraph';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Animated Steam Graph</h2>
        </div>
        <div>
          <SteamGraph data={this.props.data} metadata={this.props.metadata} />
        </div>
      </div>
    );
  }
}

export default App;
