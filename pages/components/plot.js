import dynamic from "next/dynamic";
import React, { Component } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

class Plot extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Chart
          options={this.props.options}
          series={this.props.series}
          type={this.props.type}
          width="350"
          height="380"
        />
      </div>
    );
  }
}

export default Plot;
