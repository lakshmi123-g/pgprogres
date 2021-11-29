import React from "react";
import { select } from "d3-selection";
import { transition } from "d3-transition";
//import { scaleLinear } from 'd3-scale';

class Progress extends React.Component {
  constructor() {
    super();
    this.ref = React.createRef();
  }
  componentDidMount() {
    this.init();
  }
  componentDidUpdate() {
    this.barTransition();
  }
  init() {
    const { xScale, barHeight } = this.props;
    const node = this.ref.current;

    select(node)
      .append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("y", 0)
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", 0)
      .attr("height", barHeight);

    select(node)
      .append("text")
      .attr("class", "amount")
      .attr("x", 0)
      .attr("y", barHeight)
      .attr("dx", -10)
      .attr("dy", 20);

    this.barTransition();
  }
  barTransition(props) {
    const { data, xScale } = this.props;
    const t = transition().duration(800);

    select(".bar").transition(t).attr("width", xScale(data));

    select(".amount").transition(t).attr("x", xScale(data)).text(data);
  }

  render() {
    return <g ref={this.ref} className="bar-group" />;
  }
}

export default Progress;
