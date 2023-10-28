import Button from "react-bootstrap/Button";
import Card from "../components/Card";

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

const ViewSet = () => {
  const set = response.set;
  const cards = response.cards;

  return (
    <main className="ViewSet">
      <section className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2 align-items-center">
          <h1>{set.title}</h1>
          <h2>{set.category_name}</h2>

          <Button variant="link">
            <i className="fa-regular fa-heart"></i>
            <i className="fa-solid fa-heart"></i>
          </Button>
        </div>
        <Button variant="primary">Edit Set</Button>
      </section>

      <Card />

      <section className="d-flex">
        <p>{set.username}</p>
        <p>{set.description}</p>
      </section>
    </main>
  );
};

export default ViewSet;
