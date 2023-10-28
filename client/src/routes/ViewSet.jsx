import { useState } from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fillHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

const response = {
  set: {
    id: 1,
    title: "Chemistry",
    description: "Study notes for my class!",
    private: false,
    category_id: 1,
    user_id: 1,
    category_name: "School",
    username: "testUser1",
  },
  cards: [
    {
      id: 1,
      set_id: 1,
      front: "Three forms of state",
      back: "Solid, gas, liquid",
      image_url: null,
    },
    {
      id: 2,
      set_id: 1,
      front: "Chemical formula for water",
      back: "H2O",
      image_url: null,
    },
    {
      id: 3,
      set_id: 1,
      front: "Chemical symbol for Hydrogen",
      back: "H",
      image_url: null,
    },
  ],
};

const user = { id: 1 };

const ViewSet = () => {
  const [isLiked, setIsLiked] = useState(false);
  const set = response.set;
  const cards = response.cards;

  const toggleLike = () => {
    // To be updated to reflect change in database
    setIsLiked(!isLiked);
  };

  return (
    <main className="ViewSet">
      <section className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2 align-items-center">
          <h1>{set.title}</h1>
          <h2>
            <Badge bg="secondary">{set.category_name}</Badge>
          </h2>
          {user.id && (
            <Button variant="link" onClick={toggleLike}>
              {isLiked ? (
                <FontAwesomeIcon icon={fillHeart} />
              ) : (
                <FontAwesomeIcon icon={emptyHeart} />
              )}
            </Button>
          )}
        </div>
        {user.id === set.user_id && <Button variant="primary">Edit Set</Button>}
      </section>

      <Card />

      <section className="d-flex gap-2">
        <p>{set.username}</p>
        <p>{set.description}</p>
      </section>
    </main>
  );
};

export default ViewSet;
