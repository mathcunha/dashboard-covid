import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleUp,
  faAngleDoubleDown,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";

function formatNumber(value, count) {
  if (parseInt(value) == value) {
    return value;
  } else {
    return (value / count).toPrecision(3) + "%";
  }
}

function printRate(style, angle, rate, property) {
  if (property === "death_rate") {
    return <React.Fragment />;
  }
  return (
    <p className={style}>
      <FontAwesomeIcon icon={angle} /> {rate + " %"}
      <style jsx>{`
        .money.plus {
          color: #c0392b;
        }

        .money.minus {
          color: #2ecc71;
        }
      `}</style>
    </p>
  );
}

const TotalCard = ({ dataset, estado, property, description }) => {
  if (!dataset) {
    dataset = [];
  }
  if (estado !== "todos")
    dataset = dataset.filter((item) => item.state === estado);

  const total = dataset
    .filter((item) => item.is_last === "True")
    .filter((item) => item.place_type === "state")
    .reduce((acc, item) => (acc += Number(item[property])), 0);

  const count = dataset
    .filter((item) => item.is_last === "True")
    .filter((item) => item.place_type === "state")
    .reduce((acc, item) => (acc += 1), 0);

  const lastUpdate = dataset.reduce(
    (acc, item) => (acc > item.date ? acc : item.date),
    "2019-04-02"
  );

  const yesterday = dataset.reduce(
    (acc, item) => (acc > item.date && acc != lastUpdate ? acc : item.date),
    "2019-04-02"
  );
  const totalYesterday = dataset
    .filter((item) => item.place_type === "state")
    .filter((item) => item.date == yesterday)
    .reduce((acc, item) => (acc += Number(item[property])), 0);

  let rate = 100 * (1 - total / totalYesterday).toFixed(2);

  const style = totalYesterday < total ? "money plus" : "money minus";
  const angle = totalYesterday < total ? faAngleDoubleUp : faAngleDoubleDown;

  if (isNaN(rate) || rate == Number.NEGATIVE_INFINITY) rate = 0;
  return (
    <div>
      <h4>{description}</h4>
      <p className="money number">
        <FontAwesomeIcon icon={faStethoscope} /> {formatNumber(total, count)}
      </p>
      {printRate(style, angle, rate, property)}
      <style jsx>{`
        h4 {
          margin: 0;
          font-size: 20px;
          text-transform: uppercase;
        }
        .money {
          font-size: 15px;
          letter-spacing: 1px;
          margin: 5px 0;
        }

        .money.number {
          font-size: 20px;
          color: #9e9e9e;
        }
      `}</style>
    </div>
  );
};

export default TotalCard;
