import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const CardItem = ({ front, back }) => {
  const [isFlip, setIsFlip] = useState(false);

  const speakText = (e) => {
    e.stopPropagation();
    console.log("play speech");
  };

  return (
    <div
      className={`Card ${isFlip ? "flip" : ""}`}
      onClick={() => setIsFlip(!isFlip)}
    >
      <div className="card-front">
        <div className="card__icons-container">
          <Button variant="link" onClick={speakText}>
            <FontAwesomeIcon icon={faVolumeHigh} />
          </Button>
        </div>
        <p className="card__text">{front}</p>
      </div>
      <div className="card-back">
        <div className="card__icons-container">
          <Button variant="link" onClick={speakText}>
            <FontAwesomeIcon icon={faVolumeHigh} />
          </Button>
        </div>
        <p className="card__text">{back}</p>
      </div>
    </div>
  );
};

export default CardItem;
