import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleUp,
  faAngleDoubleDown,
  faStethoscope,
} from "@fortawesome/free-solid-svg-icons";

const TotalCard = ({ dataset, estado, description }) => {
  if (!dataset) {
    dataset = [];
  }
  if (estado !== "todos")
    dataset = dataset.filter((item) => item.state === estado);

  const total = dataset
    .filter((item) => item.is_last === "True")
    .filter((item) => item.place_type === "state")
    .reduce((acc, item) => (acc += Number(item[description])), 0);

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
    .reduce((acc, item) => (acc += Number(item[description])), 0);

  console.log(yesterday);
  console.log(totalYesterday);

  let rate = 100 * (1 - total / totalYesterday).toFixed(2);

  const style = totalYesterday < total ? "money plus" : "money minus";
  const angle = totalYesterday < total ? faAngleDoubleUp : faAngleDoubleDown;

  if (isNaN(rate) || rate == Number.NEGATIVE_INFINITY) rate = 0;
  return (
    <div>
      <h4>{description}</h4>
      <p className="money number">
        <FontAwesomeIcon icon={faStethoscope} /> {total}
      </p>
      <p className={style}>
        <FontAwesomeIcon icon={angle} /> {rate + " %"}
      </p>

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

        .money.plus {
          color: #c0392b;
        }

        .money.minus {
          color: #2ecc71;
        }
      `}</style>
    </div>
  );
};

export default TotalCard;
