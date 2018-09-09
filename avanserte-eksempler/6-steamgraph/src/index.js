import React from 'react';
import ReactDOM from 'react-dom';
import { transpose } from 'd3-array';

import './index.css';
import App from './App';

const LAYERS = 20;
const SAMPLES = 200;
const BUMPS = 10;

function bumps(numSamples, numBumps) {
  let layer = Array(numSamples).fill(0);

  for (let i = 0; i < numBumps; i++) {
    layer = bump(layer, numSamples);
  }

  return layer;
}

function bump(layer, numSamples) {
  let x = 1 / (0.1 + Math.random());
  let y = 2 * Math.random() - 0.5;
  let z = 10 / (0.1 + Math.random());

  return layer.map((v, i) => {
    let w = (i / numSamples - y) * z;
    return v + x * Math.exp(-w * w);
  });
}

/*
  bumps() genererer vertikale slices av data, vi vil ha horisontale "lag".
  Derfor må vi transpose (bytte om på kolonner og rader) det vi genererer
*/

let data = {
  selectionA: transpose(
    Array(LAYERS)
      .fill(0)
      .map(() => bumps(SAMPLES, BUMPS))
  ),
  selectionB: transpose(
    Array(LAYERS)
      .fill(0)
      .map(() => bumps(SAMPLES, BUMPS))
  )
};

ReactDOM.render(
  <App
    data={data}
    metadata={{
      numberOfLayers: LAYERS,
      numberOfSamplesPerLayer: SAMPLES
    }}
  />,
  document.getElementById('root')
);
