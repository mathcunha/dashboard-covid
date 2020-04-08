import Layout from "./components/layout";
import LastUpdate from "./components/lastUpdate";
import TotalCard from "./components/totalCard";
import csv from "csvtojson";
import useSWR from "swr";
import PlotNext from "./components/plotNext";
import { useState } from "react";
import PredictPlot from "./components/predictPlot";
import Estados from "./components/estados";

function prepareData(dataset, estado) {
  if (!dataset) {
    dataset = [];
  }

  if (estado !== "todos")
    dataset = dataset.filter((item) => item.state === estado);

  dataset = dataset.filter((item) => item.place_type === "state");

  let preparedData = {};

  dataset.forEach((element) => {
    let confirmed = 0;
    if (element.confirmed) confirmed = Number(element.confirmed);

    let deaths = 0;
    if (element.deaths) deaths = Number(element.deaths);

    if (preparedData[element.date]) {
      preparedData[element.date] = {
        confirmed: confirmed + preparedData[element.date].confirmed,
        deaths: deaths + preparedData[element.date].deaths,
        states: preparedData[element.date].states + 1,
      };
    } else {
      preparedData[element.date] = {
        confirmed: confirmed,
        deaths: deaths,
        states: 1,
      };
    }
  });

  return preparedData;
}

function fetcher(url) {
  console.log("loading data");
  const converter = csv({
    noheader: false,
    trim: true,
  });
  return fetch(url)
    .then((r) => r.text())
    .then((body) => converter.fromString(body))
    .then((data) => ({ dataset: data, tamanho: data.length }));
}

const Index = () => {
  const [estado, setEstado] = useState("todos");
  const { data, error } = useSWR(`/api/brasilio/todos`, fetcher);
  //const { data, error } = useSWR(`/api/brasilio/${estado}`, fetcher);
  // The following line has optional chaining, added in Next.js v9.1.5,
  // is the same as `data && data.author`
  const dataset = data?.dataset;
  let quote = data?.quote;

  if (!data) {
    quote = "Loading...";
  }
  if (error) quote = "Failed to fetch the quote.";

  return (
    <Layout>
      <div className="row">
        <p>
          <span>Selecione o Estado:</span>
        </p>
        <Estados estado={estado} handleChange={setEstado} />
        <LastUpdate dataset={dataset} estado={estado} />
      </div>
      <div className="inc-exp-container">
        <TotalCard
          dataset={dataset}
          estado={estado}
          description="confirmados"
          property="confirmed"
        />
        <TotalCard
          dataset={dataset}
          estado={estado}
          description="mortes"
          property="deaths"
        />
        <TotalCard
          dataset={dataset}
          estado={estado}
          description="risco de morte"
          property="death_rate"
        />
      </div>
      <div className="row">
        <PredictPlot
          prepared={prepareData(dataset, estado)}
          estado={estado}
          title="Evolução do COVID-19"
        />
      </div>
    </Layout>
  );
};

export default Index;
