import Plot from "./plot";

const PlotNext = ({ dataset, estado, title }) => {
  if (!dataset) {
    dataset = [];
  }

  if (estado !== "todos")
    dataset = dataset.filter((item) => item.state === estado);

  dataset = dataset.filter((item) => item.place_type === "state");

  let plotData = {};

  dataset.forEach((element) => {
    let confirmed = 0;
    if (element.confirmed) confirmed = Number(element.confirmed);

    let deaths = 0;
    if (element.deaths) deaths = Number(element.deaths);

    if (plotData[element.date]) {
      plotData[element.date] = {
        confirmed: confirmed + plotData[element.date].confirmed,
        deaths: deaths + plotData[element.date].deaths,
        states: plotData[element.date].states + 1,
      };
    } else {
      plotData[element.date] = {
        confirmed: confirmed,
        deaths: deaths,
        states: 1,
      };
    }
  });

  const xData = [];
  const seriesA = [];
  const seriesB = [];
  Object.keys(plotData).map((keyName, i) => {
    if (estado !== "todos" || plotData[keyName].states >= 25) {
      xData.push(keyName);
      seriesA.push(plotData[keyName].confirmed);
      seriesB.push(plotData[keyName].deaths);
    }
  });

  const options = {
    chart: {
      type: "line",
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#d50000", "#212121"],
    stroke: {
      width: [4, 4],
    },
    plotOptions: {
      bar: {
        columnWidth: "20%",
      },
    },
    xaxis: {
      categories: xData.reverse(),
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#d50000",
        },
        labels: {
          style: {
            colors: "#d50000",
          },
        },
        title: {
          text: "Confirmados",
          style: {
            color: "#d50000",
          },
        },
      },
      {
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#212121",
        },
        labels: {
          style: {
            colors: "#212121",
          },
        },
        title: {
          text: "Mortes",
          style: {
            color: "#212121",
          },
        },
      },
    ],
    tooltip: {
      x: {
        show: false,
      },
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40,
    },
    title: {
      text: title,
    },
  };

  const series = [
    {
      name: "Confirmados",
      data: seriesA.reverse(),
    },
    {
      name: "Mortes",
      data: seriesB.reverse(),
    },
  ];

  return <Plot options={options} series={series} />;
};
export default PlotNext;
