import { useState } from "react";
import CardItem from "./CardItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

const Cards = (props) => {
  const [currCard, setCurrCard] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const { front, back } = props.cards[currCard - 1];

  const resetCard = () => {
    setCurrCard(1);
    setIsFinished(false);
  };

  const prevCard = () => {
    setCurrCard((prevIndex) => (prevIndex === 1 ? 1 : prevIndex - 1));
  };

  const nextCard = () => {
    setCurrCard((prevIndex) => {
      if (prevIndex + 1 <= props.cards.length) {
        return prevIndex + 1;
      } else {
        setIsFinished(true);
        return prevIndex;
      }
    });
  };

  return (
    <div className="cards-container">
      <CardItem/>
      {!isFinished && (
        <div className="cards-navigation">
          <Button variant="link" onClick={prevCard}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          <span>
            {currCard}/{props.cards.length}
          </span>
          <Button variant="link">
            <FontAwesomeIcon icon={faArrowRight} onClick={nextCard} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cards;
