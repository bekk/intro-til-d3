import React, { Component } from 'react';
import './App.css';

import { extent, max } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import { select, event } from 'd3-selection';
import { area, curveMonotoneX } from 'd3-shape';
import { axisLeft, axisBottom } from 'd3-axis';
import { brushX } from 'd3-brush';
import { zoom, zoomIdentity } from 'd3-zoom';

const WIDTH = 960;
const HEIGHT_FOCUS = 500;
const HEIGHT_CONTEXT = 100;
const PADDING = 20;

class ZoomableTimeSeries extends Component {
  constructor(props) {
    super(props);

    this.createZoomableTimeSeries = this.createZoomableTimeSeries.bind(this);
  }

  componentDidMount() {
    this.createZoomableTimeSeries();
  }

  componentDidUpdate() {
    this.createZoomableTimeSeries();
  }

  createZoomableTimeSeries() {
    let node = this.node;
    let { data } = this.props;

    let xScaleFocus = scaleTime()
      .range([0, WIDTH])
      .domain(extent(data, datum => datum.date));
    let yScaleFocus = scaleLinear()
      .range([HEIGHT_FOCUS, 0])
      .domain([0, max(data, datum => datum.price)]);
    let xScaleContext = scaleTime()
      .range([0, WIDTH])
      .domain(extent(data, datum => datum.date));
    let yScaleContext = scaleLinear()
      .range([HEIGHT_CONTEXT, 0])
      .domain([0, max(data, datum => datum.price)]);

    let xAxisFocus = axisBottom(xScaleFocus);
    let xAxisContext = axisBottom(xScaleContext);
    let yAxisFocus = axisLeft(yScaleFocus);

    let brush = brushX()
      .extent([[0, 0], [WIDTH, HEIGHT_CONTEXT]])
      .on('brush end', function brushed() {
        if (event.sourceEvent && event.sourceEvent.type === 'zoom') {
          return;
        }

        let selection = event.selection || xScaleContext.range();

        /*
          Selection er en verdi fra "range",
          vi må mappe den tilbake til domenet til context med invert
        */
        xScaleFocus.domain(selection.map(xScaleContext.invert));

        // Re-tegne area
        focus.select('.area').attr('d', focusAreaGenerator);
        // Re-tegne x-axis
        focus.select('.x-axis').call(xAxisFocus);

        // Endre hva zoomern ser på så den ser på det samme som brush
        rootPanel
          .select('.zoom')
          .call(
            zoomer.transform,
            zoomIdentity
              .scale(WIDTH / (selection[1] - selection[0]))
              .translate(-selection[0], 0)
          );
      });

    let zoomer = zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([[0, 0], [WIDTH, HEIGHT_FOCUS]])
      .extent([[0, 0], [WIDTH, HEIGHT_CONTEXT]])
      .on('zoom', function zoomed() {
        if (event.sourceEvent && event.sourceEvent.type === 'brush') {
          return;
        }

        let transform = event.transform;

        xScaleFocus.domain(transform.rescaleX(xScaleContext).domain());

        // Re-tegne area
        focus.select('.area').attr('d', focusAreaGenerator);
        // Re-tegne x-axis
        focus.select('.x-axis').call(xAxisFocus);

        // Endre hva brushen ser på så den ser på det samme som zoomer
        context
          .select('.brush')
          .call(
            brush.move,
            xScaleFocus.range().map(transform.invertX, transform)
          );
      });

    let focusAreaGenerator = area()
      .curve(curveMonotoneX)
      .x(datum => xScaleFocus(datum.date))
      .y0(HEIGHT_FOCUS)
      .y1(datum => yScaleFocus(datum.price));

    let contextAreaGenerator = area()
      .curve(curveMonotoneX)
      .x(datum => xScaleContext(datum.date))
      .y0(HEIGHT_CONTEXT)
      .y1(datum => yScaleContext(datum.price));

    let rootPanel = select(node).append('g');

    // Clip for hvilken del av fullsize-grafen som skal vises
    rootPanel
      .append('defs')
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', WIDTH)
      .attr('height', HEIGHT_FOCUS);

    let focus = rootPanel
      .append('g')
      .attr('class', 'focus')
      .attr('transform', `translate(${PADDING * 2},${PADDING})`);

    // Tegn focus area
    focus
      .append('path')
      .datum(data)
      .attr('class', 'area')
      .attr('d', focusAreaGenerator);

    // X Axis for focus
    focus
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${HEIGHT_FOCUS})`)
      .call(xAxisFocus);

    // Y Axis for focus
    focus
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxisFocus);

    let context = rootPanel
      .append('g')
      .attr('class', 'context')
      .attr(
        'transform',
        `translate(${PADDING * 2},${PADDING * 3 + HEIGHT_FOCUS})`
      );

    // Tegn context area
    context
      .append('path')
      .datum(data)
      .attr('class', 'area')
      .attr('d', contextAreaGenerator);

    // X Axis for context
    context
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${HEIGHT_CONTEXT})`)
      .call(xAxisContext);

    // Brush for context
    context
      .append('g')
      .attr('class', 'brush')
      .call(brush)
      .call(brush.move, xScaleFocus.range());

    rootPanel
      .append('rect')
      .attr('class', 'zoom')
      .attr('width', WIDTH)
      .attr('height', HEIGHT_FOCUS)
      .attr('transform', `translate(${PADDING},${PADDING})`)
      .call(zoomer);
  }

  render() {
    return (
      <div>
        <svg
          ref={node => (this.node = node)}
          viewBox={`0 0 ${WIDTH + PADDING * 3} ${HEIGHT_FOCUS +
            HEIGHT_CONTEXT +
            PADDING * 4}`}
        />
      </div>
    );
  }
}
export default ZoomableTimeSeries;
