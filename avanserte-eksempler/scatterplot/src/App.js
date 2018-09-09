import React, { Component } from 'react';
import './App.css';
import ScatterPlot from './ScatterPlot';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Scatter Plot</h2>
        </div>
        <div>
          <ScatterPlot data={this.props.data} />
        </div>
      </div>
    );
  }
}

export default App;
