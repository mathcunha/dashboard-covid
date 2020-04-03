import dynamic from "next/dynamic";
import React, { Component } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

class Plot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: props.description,
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type={this.props.type}
          width="350"
        />
      </div>
    );
  }
}

export default Plot;
