import React, { Component } from 'react';
import './App.css';

import { max, min, range } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { select, selectAll } from 'd3-selection';
import { stack, stackOffsetWiggle, area } from 'd3-shape';
import { interpolateRainbow } from 'd3-scale-chromatic';
import { transition } from 'd3-transition';

const WIDTH = 960;
const HEIGHT = 500;

class SteamGraph extends Component {
  constructor(props) {
    super(props);

    this.isASelected = true;

    this.createSteamGraph = this.createSteamGraph.bind(this);
    this.swap = this.swap.bind(this);
  }

  componentDidMount() {
    this.createSteamGraph();
  }

  componentDidUpdate() {
    this.createSteamGraph();
  }

  createSteamGraph() {
    let node = this.node;
    let { data, metadata } = this.props;
    let { selectionA, selectionB } = data;
    let { numberOfLayers, numberOfSamplesPerLayer } = metadata;

    let stackGenerator = stack()
      .keys(range(numberOfLayers))
      .offset(stackOffsetWiggle);

    this.layersA = stackGenerator(selectionA);
    this.layersB = stackGenerator(selectionB);
    let allLayers = this.layersA.concat(this.layersB);

    let xScale = scaleLinear()
      .domain([0, numberOfSamplesPerLayer - 1])
      .range([0, WIDTH]);

    let yScale = scaleLinear()
      .domain([
        min(allLayers, layer => min(layer, ([baseline]) => baseline)),
        max(allLayers, layer => max(layer, ([, topline]) => topline))
      ])
      .range([HEIGHT, 0]);

    // Lag en areaGenerator basert på x og y scales
    this.areaGenerator = area()
      .x((_, i) => xScale(i))
      .y0(([baseline]) => yScale(baseline))
      .y1(([, topline]) => yScale(topline));

    let rootPanel = select(node).append('g');

    rootPanel
      .selectAll('path')
      .data(this.layersA)
      .enter()
      .append('path')
      .attr('d', this.areaGenerator)
      .attr('fill', () => interpolateRainbow(Math.random()));
  }

  swap() {
    let t = transition().duration(2500);

    selectAll('path')
      .data(this.isASelected ? this.layersB : this.layersA)
      .transition(t)
      .attr('d', this.areaGenerator);

    this.isASelected = !this.isASelected;
  }

  render() {
    return (
      <div>
        <button onClick={this.swap}>Swap selections</button>
        <svg
          ref={node => (this.node = node)}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        />
      </div>
    );
  }
}
export default SteamGraph;
