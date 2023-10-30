import { useEffect, useState } from "react";
import CardFace from "./CardFace";

const CardItem = (props) => {
  const [isFlip, setIsFlip] = useState(false);
  const { front, back, currCard, seq, isSetOwner } = props;

  useEffect(() => {
    if (isFlip) {
      setIsFlip(false);
    }
  }, [currCard]);

  return (
    <div
      className={`Card${isFlip ? " flip" : ""}${
        seq === currCard ? " active" : ""
      }`}
      onClick={() => setIsFlip(!isFlip)}
    >
      <CardFace position="front" isSetOwner={isSetOwner} text={front} />
      <CardFace position="back" isSetOwner={isSetOwner} text={back} />
    </div>
  );
};

export default CardItem;
