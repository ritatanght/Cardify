import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../context/UserProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/styles/EditSet.scss";
import { toast } from "react-toastify";

const EditSet = () => {
  const navigate = useNavigate();
  const { setId } = useParams();
  const { user, clearUserInfo } = useUser();

  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSetPromise = axios.get(`/api/sets/${setId}`);
    const categoriesPromise = axios.get("/api/categories/");

    Promise.all([getSetPromise, categoriesPromise])
      .then(([setData, categoryData]) => {
        const set = setData.data.set;
        const cards = setData.data.cards;

        setUserId(set.user_id);
        setTitle(set.title);
        setDescription(set.description);
        setSelectedCategory({
          name: set.category_name,
          id: set.category_id,
        }); //Category state is stored as an object. ID is required for submitting
        setIsPrivate(set.private);
        setCards(cards);
        setCategories(categoryData.data);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  console.log(cards);
  const handleSubmit = (event) => {
    event.preventDefault();

    const setFormData = {
      title,
      description,
      category_id: selectedCategory.id,
      private: isPrivate,
      set_id: setId,
    };

    axios
      .put(`/api/sets/edit/${setId}`, setFormData)
      .then((result) => {
        const setId = result.data.id;
        const cardDataWithSetId = cards.map((card) => ({
          ...card,
          set_id: setId,
        }));
        axios.put(`/api/cards/edit/${setId}`, cardDataWithSetId);
      })
      .then(() => {
        // TODO: Fix to get toast message from res.data.message
        toast.success("Set update successfully", { position: "top-center" });
        navigate("/profile");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.info(err.response.data.message);
          clearUserInfo();
          return navigate("/login");
        } else {
          toast.error(err);
        }
      });
  };

  const addCard = () => {
    const newCards = [
      ...cards,
      {
        front: "",
        back: "",
      },
    ];
    setCards(newCards);
  };

  const handleCardUpdate = (e, side, index) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[index][side] = e.target.value;
      return updatedCards;
    });
  };

  const handleDelete = (cardIndex) => {
    let updatedCards = [...cards];
    // A card has an id means it's been created in the database previously
    // we have to keep it to update the database
    if (cards[cardIndex].id) {
      updatedCards[cardIndex].deleted = true;
      setCards(updatedCards);
    } else {
      // otherwise, we could just remove it from the array
      setCards((prevCards) =>
        prevCards.filter((card, index) => index !== cardIndex)
      );
    }
  };

  if (isLoading) {
    return (
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (!user)
    return (
      <main>
        <h1>Please login to edit the set</h1>
        <Link to="/login">Login</Link>
      </main>
    );

  if (user.id !== userId) {
    return <h1>Sorry, you don&apos;t have permission to edit this set!</h1>;
  }

  return (
    <div className="create-container">
      <Form>
        <div className="set-container">
          <div className="set-header-container">
            <h1>Edit: {title}</h1>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Edit
            </Button>
          </div>
          <div className="set-info-container">
            <FloatingLabel label="Title">
              <Form.Control
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FloatingLabel>
            <div className="set-info-details">
              <FloatingLabel label="Description">
                <Form.Control
                  as="textarea"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
              <div className="set-info-options">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedCategory.name || "Select a category"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {categories.map((category) => (
                      <Dropdown.Item
                        key={category.id}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Check
                  type="checkbox"
                  checked={isPrivate}
                  onChange={() => setIsPrivate(!isPrivate)}
                  reverse
                  label="Private?"
                />
              </div>
            </div>
          </div>
        </div>

        {cards.map(
          (card, index) =>
            !card.deleted && (
              <div key={index} className="card-container">
                <div className="card-frontback-container">
                  <FloatingLabel label="Front" className="card-container-front">
                    <Form.Control
                      type="text"
                      placeholder="Front"
                      value={card.front}
                      onChange={(e) => handleCardUpdate(e, "front", index)}
                    />
                  </FloatingLabel>
                  <FloatingLabel label="Back" className="card-container-back">
                    <Form.Control
                      type="text"
                      placeholder="Back"
                      value={card.back}
                      onChange={(e) => handleCardUpdate(e, "back", index)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDelete(index)}
                    />
                  </FloatingLabel>
                </div>
              </div>
            )
        )}
        <div className="footer-button-container">
          <Button onClick={addCard}>Add Card</Button>
        </div>
      </Form>
    </div>
  );
};

export default EditSet;
