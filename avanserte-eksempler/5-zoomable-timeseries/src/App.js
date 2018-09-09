import React, { Component } from 'react';
import './App.css';
import ZoomableTimeSeries from './ZoomableTimeSeries';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zoomable Time Series</h2>
        </div>
        <div>
          <ZoomableTimeSeries
            data={this.props.data}
            metadata={this.props.metadata}
          />
        </div>
      </div>
    );
  }
}

export default App;
