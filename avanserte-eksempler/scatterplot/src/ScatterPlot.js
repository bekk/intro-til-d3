import React, { Component } from 'react';
import './App.css';

import { max, min } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { axisRight, axisBottom } from 'd3-axis';
import { select } from 'd3-selection';

const PADDING = 10;
const SIZE = 140;
const TRAITS = ['pH', 'alcohol', 'quality'];
const N = TRAITS.length;

function traitToScale(wines, traits, trait) {
  let domain = [min(wines, d => d[trait]), max(wines, d => d[trait])];
  let range = [PADDING / 2, SIZE - PADDING / 2];

  let x = scaleLinear()
    .domain(domain)
    .range(range);

  let y = scaleLinear()
    .domain(domain)
    .range(range.reverse());

  traits[trait] = {
    x,
    y
  };

  return traits;
}

function plot(rootNode, wines) {
  let scales = TRAITS.reduce(traitToScale.bind(null, wines), {});
  let traitMatrix = cross(TRAITS, TRAITS);

  let rootPanel = select(rootNode).append('g');

  // X Axes
  rootPanel
    .selectAll('g.x.axis')
    .data(TRAITS)
    .enter()
    .append('g')
    .attr('class', 'x axis')
    .attr('transform', (trait, index) => `translate(${index * SIZE},0)`)
    .each(function(trait) {
      select(this).call(
        axisBottom()
          .ticks(5)
          .tickSize(SIZE * N)
          .scale(scales[trait].x)
      );
    });

  // Y Axes
  rootPanel
    .selectAll('g.y.axis')
    .data(TRAITS)
    .enter()
    .append('g')
    .attr('class', 'y axis')
    .attr('transform', (trait, index) => `translate(0,${index * SIZE})`)
    .each(function(trait) {
      select(this).call(
        axisRight()
          .ticks(5)
          .tickSize(SIZE * N)
          .scale(scales[trait].y)
      );
    });

  let cells = rootPanel
    .selectAll('g.cell')
    .data(traitMatrix)
    .enter()
    .append('g')
    .attr('class', 'cell')
    .attr('transform', ({ i, j }) => `translate(${i * SIZE},${j * SIZE})`)
    .each(function({ traitI, traitJ }) {
      let traitCell = select(this);
      plotCell(traitCell, wines, scales, traitI, traitJ);
    });

  cells
    .append('text')
    .attr('x', PADDING)
    .attr('y', PADDING)
    .attr('font-size', '0.5em')
    .attr('dy', '.71em')
    .text(crossedTrait => `${crossedTrait.traitI} x ${crossedTrait.traitJ}`);
}

function plotCell(traitCell, wines, scales, traitX, traitY) {
  let scaleX = scales[traitX].x;
  let scaleY = scales[traitY].y;

  //Plot frame
  traitCell
    .append('rect')
    .attr('class', 'frame')
    .attr('x', PADDING / 2)
    .attr('y', PADDING / 2)
    .attr('width', SIZE - PADDING)
    .attr('height', SIZE - PADDING);

  // Plot wine data from selected trait crossing
  traitCell
    .selectAll('circle')
    .data(wines)
    .enter()
    .append('circle')
    .attr('class', wine => wine.color)
    .attr('cx', wine => scaleX(wine[traitX]))
    .attr('cy', wine => scaleY(wine[traitY]))
    .attr('r', 3);
}

function cross(traits) {
  return traits
    .map(function(traitI, i) {
      return traits.map(function(traitJ, j) {
        return {
          traitI,
          traitJ,
          i,
          j
        };
      });
    })
    .reduce((flat, arr) => flat.concat(arr), []);
}

class ScatterPlot extends Component {
  constructor(props) {
    super(props);
    this.createScatterPlot = this.createScatterPlot.bind(this);
  }

  componentDidMount() {
    this.createScatterPlot();
  }

  componentDidUpdate() {
    this.createScatterPlot();
  }

  createScatterPlot() {
    let node = this.node;
    let data = this.props.data;

    plot(node, data);
  }

  render() {
    return (
      <svg
        ref={node => (this.node = node)}
        viewBox={`0 0 ${N * (SIZE + PADDING)} ${N * (SIZE + PADDING)}`}
      />
    );
  }
}
export default ScatterPlot;
