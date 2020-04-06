import Layout from "./components/layout";
import LastUpdate from "./components/lastUpdate";
import TotalCard from "./components/totalCard";
import csv from "csvtojson";
import useSWR from "swr";
import PlotNext from "./components/plotNext";
import { useState } from "react";
import PredictPlot from "./components/predictPlot";

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
        <select
          name="estados-brasil"
          defaultValue={estado}
          onChange={(e) =>
            setEstado(e.target.options[e.target.selectedIndex].value)
          }
        >
          <option value="todos">Todos</option>
          <option value="AC">Acre</option>
          <option value="AL">Alagoas</option>
          <option value="AP">Amapá</option>
          <option value="AM">Amazonas</option>
          <option value="BA">Bahia</option>
          <option value="CE">Ceará</option>
          <option value="DF">Distrito Federal</option>
          <option value="ES">Espírito Santo</option>
          <option value="GO">Goiás</option>
          <option value="MA">Maranhão</option>
          <option value="MT">Mato Grosso</option>
          <option value="MS">Mato Grosso do Sul</option>
          <option value="MG">Minas Gerais</option>
          <option value="PA">Pará</option>
          <option value="PB">Paraíba</option>
          <option value="PR">Paraná</option>
          <option value="PE">Pernambuco</option>
          <option value="PI">Piauí</option>
          <option value="RJ">Rio de Janeiro</option>
          <option value="RN">Rio Grande do Norte</option>
          <option value="RS">Rio Grande do Sul</option>
          <option value="RO">Rondônia</option>
          <option value="RR">Roraima</option>
          <option value="SC">Santa Catarina</option>
          <option value="SP">São Paulo</option>
          <option value="SE">Sergipe</option>
          <option value="TO">Tocantins</option>
        </select>
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
      <style jsx>{`
        select {
          padding: 10px 20px 10px 10px;
          -moz-appearance: none;
          -webkit-appearance: none;
          appearance: none;
          border: 1px solid #dedede;
          font-size: 16px;
          outline-color: var(--primary-color);
          background: transparent;
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%20000002%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
          background-position: right 10px top 50%, 0, 0;
          background-size: 12px auto, 100%;
          background-repeat: no-repeat;
        }
      `}</style>
    </Layout>
  );
};

export default Index;
