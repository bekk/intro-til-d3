import React from 'react';
import ReactDOM from 'react-dom';
import { dsv } from 'd3-fetch';

import './index.css';
import App from './App';
import redwine from './data/winequality-red.csv';
import whitewine from './data/winequality-white.csv';

function parseWineData(color, d) {
  return {
    color,
    'fixed acidity': +d['fixed acidity'],
    'volatile acidity': +d['volatile acidity'],
    'citric acid': +d['citric acid'],
    'residual sugar': +d['residual sugar'],
    chlorides: +d['chlorides'],
    'free sulfur dioxide': +d['free sulfur dioxide'],
    'total sulfur dioxide': +d['total sulfur dioxide'],
    density: +d['density'],
    pH: +d['pH'],
    sulphates: +d['sulphates'],
    alcohol: +d['alcohol'],
    quality: +d['quality']
  };
}

const parseRedWineData = parseWineData.bind(null, 'red');
const parseWhiteWineData = parseWineData.bind(null, 'white');

Promise.all([
  dsv(';', redwine, parseRedWineData),
  dsv(';', whitewine, parseWhiteWineData)
]).then(function([reds, whites]) {
  ReactDOM.render(<App data={reds} />, document.getElementById('root'));
});
