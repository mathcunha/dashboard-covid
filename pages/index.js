import Layout from "./components/layout";
import LastUpdate from "./components/lastUpdate";
import TotalCard from "./components/totalCard";
import fetch from "isomorphic-unfetch";
import csv from "csvtojson";
import PlotNext from "./components/plotNext";
import { useState } from "react";

const Index = ({ dataset }) => {
  const [estado, setEstado] = useState("todos");

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
        <TotalCard dataset={dataset} estado={estado} description="confirmed" />
        <TotalCard dataset={dataset} estado={estado} description="deaths" />
      </div>
      <div className="row">
        <PlotNext
          dataset={dataset}
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

Index.getInitialProps = async (ctx) => {
  const body = await fetch(
    "https://brasil.io/dataset/covid19/caso?format=csv"
  ).then((res) => res.text());

  const converter = csv({
    noheader: false,
    trim: true,
  });

  const dataset = await converter.fromString(body);

  return { dataset: dataset };
};

export default Index;
