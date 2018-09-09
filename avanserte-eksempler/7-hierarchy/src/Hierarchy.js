import React, { Component } from "react";
import "./App.css";
import { scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { select } from "d3-selection";
import { axisLeft } from "d3-axis";
import { hierarchy, pack } from "d3-hierarchy";

export default class Hierarchy extends Component {
  constructor(props) {
    super(props);
    this.createHierarchy = this.createHierarchy.bind(this);
  }

  componentDidMount() {
    this.createHierarchy();
  }

  componentDidUpdate() {
    this.createHierarchy();
  }

  createHierarchy() {
    const svg = this.svg;
    const width = this.props.size[0];
    const height = this.props.size[1];
    const data = this.props.data;

    // ENTRY POINT FOR D3
  }

  render() {
    return <svg ref={svg => (this.svg = svg)} 
      width={this.props.size[0]} 
      height={this.props.size[1]} />;
  }
}