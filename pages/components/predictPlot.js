import regression from "regression";
import Plot from "./plot";

function getPrediction(confirmedData) {
  const polyConfirmed = regression.polynomial(confirmedData, { order: 2 });
  const expoConfirmed = regression.exponential(confirmedData);

  return expoConfirmed.r2 > polyConfirmed.r2 ? expoConfirmed : polyConfirmed;
}

function addPredictions(
  regConfirmed,
  regDeath,
  lastUpdate,
  xData,
  seriesA,
  seriesB,
  length
) {
  let nextDate = new Date(lastUpdate);
  for (let index = 0; index < 90; index++) {
    nextDate.setDate(nextDate.getDate() + 1);
    const date = nextDate.toISOString().split("T")[0];
    xData.push(new Date(date).getTime());
    seriesA.push(Math.ceil(regConfirmed.predict(length + index)[1]));
    seriesB.push(Math.ceil(regDeath.predict(length + index)[1]));
  }
}

const PredictPlot = ({ prepared, estado, title }) => {
  if (!prepared) {
    prepared = [];
  }
  let lastUpdate = null;
  let lastUpdateDate = null;
  let confirmedData = [];
  const deathData = [];
  let xData = [];
  let seriesA = [];
  let seriesB = [];

  const arrayPrepared = Object.keys(prepared);

  arrayPrepared.map((keyName, i) => {
    if (estado !== "todos" || prepared[keyName].states >= 25) {
      if (lastUpdate == null) {
        lastUpdate = keyName;
        lastUpdateDate = new Date(lastUpdate).getTime();
      }
      confirmedData.push([
        arrayPrepared.length - i,
        prepared[keyName].confirmed,
      ]);
      deathData.push([arrayPrepared.length - i, prepared[keyName].deaths]);

      xData.push(new Date(keyName).getTime());
      seriesA.push(prepared[keyName].confirmed);
      seriesB.push(prepared[keyName].deaths);
    }
  });

  const regConfirmed = getPrediction(confirmedData);
  const regDeath = getPrediction(deathData);

  if (confirmedData) {
    xData = xData.reverse();
    seriesA = seriesA.reverse();
    seriesB = seriesB.reverse();
    addPredictions(
      regConfirmed,
      regDeath,
      lastUpdate,
      xData,
      seriesA,
      seriesB,
      arrayPrepared.length + 1
    );
  }

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
      type: "datetime",
      categories: xData,
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
    annotations: {
      xaxis: [
        {
          x: lastUpdateDate,
          strokeDashArray: 2,
          borderColor: "#9e9e9e",
          label: {
            borderColor: "#9e9e9e",
            style: {
              color: "#fff",
              background: "#9e9e9e",
            },
            text: "Predição",
          },
        },
      ],
    },
  };

  const series = [
    {
      name:
        "Confirmados (margem de erro " +
        (1 - regConfirmed.r2).toFixed(2) +
        "%)",
      data: seriesA,
    },
    {
      name: "Mortes (margem de erro " + (1 - regDeath.r2).toFixed(2) + "%)",
      data: seriesB,
    },
  ];

  return <Plot options={options} series={series} />;
};

export default PredictPlot;
