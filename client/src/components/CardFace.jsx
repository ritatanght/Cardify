import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const CardFace = ({ position, text }) => {
  const speakText = (e) => {
    e.stopPropagation();
    console.log("play speech");
  };
  return (
    <div className={`card-${position}`}>
      <div className="card__icons-container">
        <Button variant="link" onClick={speakText}>
          <FontAwesomeIcon icon={faVolumeHigh} />
        </Button>
      </div>
      <p className="card__text">{text}</p>
    </div>
  );
};

export default CardFace;
