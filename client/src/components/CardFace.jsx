import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const CardFace = ({ position, text, isSetOwner }) => {
  const handleCardEdit = (e) => {
    e.stopPropagation();
    console.log("open modal");
    // to be updated
  };
  
  const speakText = (e) => {
    e.stopPropagation();
    const synth = window.speechSynthesis;
    if (!synth)
      return console.error("Your browser does not support Speech Synthesis");

    const utterance = new SpeechSynthesisUtterance(text);
    // Change voice for the speech; 7 - Google US English
    utterance.voice = synth.getVoices()[7];

    synth.speak(utterance);
  };

  return (
    <div className={`card-${position}`}>
      <div className="card__icons-container">
        {isSetOwner && (
          <Button variant="link" onClick={handleCardEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        )}
        <Button variant="link" onClick={speakText}>
          <FontAwesomeIcon icon={faVolumeHigh} />
        </Button>
      </div>
      <p className="card__text">{text}</p>
    </div>
  );
};

export default CardFace;
