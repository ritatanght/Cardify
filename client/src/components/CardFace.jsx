import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const CardFace = ({ position, text, voice, isSetOwner }) => {
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
    utterance.voice = voice;

    // cancel the ongoing utterance if there is any
    if (synth.speaking) {
      synth.cancel();
    }
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
