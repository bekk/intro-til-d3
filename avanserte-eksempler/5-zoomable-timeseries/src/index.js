import React from 'react';
import ReactDOM from 'react-dom';
import { timeParse } from 'd3-time-format';

import './index.css';
import App from './App';

const MONTHS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12'
];
const YEARS = ['2016', '2017', '2018'];

function random(u, l) {
  return l + (u - l) * Math.random();
}

function format(date) {
  return timeParse('%m %Y')(date);
}

let data = YEARS.map(function(year) {
  return MONTHS.map(function(month) {
    return {
      date: format(`${month} ${year}`),
      price: random(1000, 2000)
    };
  });
}).reduce((flat, arr) => flat.concat(arr), []);

ReactDOM.render(
  <App data={data} metadata={{}} />,
  document.getElementById('root')
);
