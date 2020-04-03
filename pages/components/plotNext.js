import Plot from "./plot";

const PlotNext = ({ dataset, estado, description, type }) => {
  if (!dataset) {
    dataset = [];
  }

  if (estado !== "todos")
    dataset = dataset.filter(item => item.state === estado);

  dataset = dataset.filter(item => item.place_type === "state");

  let plotData = {};

  dataset.forEach(element => {
    if (plotData[element.date]) {
      plotData[element.date] += Number(element[description]);
    } else {
      plotData[element.date] = Number(element[description]);
    }
  });

  const xData = [];
  const yData = [];
  Object.keys(plotData).map((keyName, i) => {
    xData.push(keyName);
    yData.push(plotData[keyName]);
  });

  const options = {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: xData.reverse() //TODO -
    }
  };
  const series = [
    {
      name: description,
      data: yData.reverse()
    }
  ];

  return <Plot options={options} series={series} type={type} />;
};
export default PlotNext;
