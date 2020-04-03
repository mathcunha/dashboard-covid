import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleUp,
  faAngleDoubleDown,
  faStethoscope
} from "@fortawesome/free-solid-svg-icons";

const TotalCard = ({ dataset, estado, description }) => {
  if (estado !== "todos")
    dataset = dataset.filter(item => item.state === estado);

  const total = dataset
    .filter(item => item.is_last === "True")
    .filter(item => item.place_type === "city")
    .reduce((acc, item) => (acc += Number(item[description])), 0);

  const lastUpdate = dataset.reduce(
    (acc, item) => (acc > item.date ? acc : item.date),
    "2019-04-02"
  );
  const totalYestarday = dataset
    .filter(item => item.is_last === "True")
    .filter(item => item.place_type === "city")
    .filter(item => item.date != lastUpdate)
    .reduce((acc, item) => (acc += Number(item[description])), 0);

  const style = total > 0 ? "money plus" : "money minus";
  const angle = total > 0 ? faAngleDoubleUp : faAngleDoubleDown;

  let rate = 1 - total / totalYestarday;
  if (isNaN(rate) || rate == Number.NEGATIVE_INFINITY) rate = 0;
  return (
    <div>
      <h4>{description}</h4>
      <p className="money number">
        <FontAwesomeIcon icon={faStethoscope} /> {total}
      </p>
      <p className={style}>
        <FontAwesomeIcon icon={angle} /> {rate}
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
