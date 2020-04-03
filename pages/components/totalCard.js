import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleUp,
  faAngleDoubleDown,
  faStethoscope
} from "@fortawesome/free-solid-svg-icons";

const TotalCard = ({ total, description }) => {
  const style = total > 0 ? "money plus" : "money minus";
  const angle = total > 0 ? faAngleDoubleUp : faAngleDoubleDown;
  return (
    <div>
      <h4>{description}</h4>
      <p className="money number">
        <FontAwesomeIcon icon={faStethoscope} /> {total}
      </p>
      <p className={style}>
        <FontAwesomeIcon icon={angle} /> {total}
      </p>

      <style jsx>{`
        h4 {
          margin: 0;
          font-size: 25px;
          text-transform: uppercase;
        }
        .money {
          font-size: 20px;
          letter-spacing: 1px;
          margin: 5px 0;
        }

        .money.number {
          font-size: 25px;
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
