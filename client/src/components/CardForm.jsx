import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

const CardForm = ({ card, onUpdate, onDelete }) => {
  return (
    <div className="card-container">
      <div className="card-frontback-container">
        <FloatingLabel label="Front" className="card-container-front">
          <Form.Control
            type="text"
            placeholder="Front"
            name="front"
            value={card.front}
            onChange={(e) => onUpdate(e)}
          />
        </FloatingLabel>
        <FloatingLabel label="Back" className="card-container-back">
          <Form.Control
            type="text"
            placeholder="Back"
            name="back"
            value={card.back}
            onChange={(e) => onUpdate(e)}
          />
          <FontAwesomeIcon icon={faTrash} onClick={onDelete} />
        </FloatingLabel>
      </div>
    </div>
  );
};

export default CardForm;
