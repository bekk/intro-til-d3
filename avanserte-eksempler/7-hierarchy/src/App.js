import React, { Component } from 'react';
import './App.css';
import Hierarchy from './Hierarchy';

class App extends Component {
  render() {
    const data = {
      "name": "Eve",
      "children": [
        {
          "name": "Cain",
        },
        {
          "name": "Seth",
          "children": [
            {
              "name": "Enos"
            },
            {
              "name": "Noam"
            }
          ]
        },
        {
          "name": "Abel"
        },
        {
          "name": "Awan",
          "children": [
            {
              "name": "Enoch"
            },
            {
              "name": "Chewbacca"
            },
            {
              "name": "Solo"
            }
          ]
        },
        {
          "name": "Azura"
        }
      ]
    };

    return (
      <div className="App">
        <div className="App-header">
          <h1>Hierarchy</h1>
        </div>
        <div>
          <Hierarchy data={data} size={[800, 500]} />
        </div>
      </div>
    );
  }
}

export default App;
