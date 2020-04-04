import dynamic from "next/dynamic";
import { Component } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

class Plot extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Chart
        options={this.props.options}
        series={this.props.series}
        type={this.props.type}
        width="450"
        height="380"
      />
    );
  }
}

export default Plot;
