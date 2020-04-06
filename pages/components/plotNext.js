import Plot from "./plot";

const PlotNext = ({ prepared, estado, title }) => {
  const xData = [];
  const seriesA = [];
  const seriesB = [];
  Object.keys(prepared).map((keyName, i) => {
    if (estado !== "todos" || prepared[keyName].states >= 25) {
      xData.push(keyName);
      seriesA.push(prepared[keyName].confirmed);
      seriesB.push(prepared[keyName].deaths);
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
