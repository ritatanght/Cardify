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


  return (
    <div className="cards-container">
      <CardItem/>
      {!isFinished && (
        <div className="cards-navigation">
          <Button variant="link">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          <span>
            {currCard}/{props.cards.length}
          </span>
          <Button variant="link">
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cards;
