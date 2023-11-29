import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";
import { useUser } from "../context/UserProvider";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Dropdown from "react-bootstrap/Dropdown";
import "../assets/styles/Create-Edit-Set.scss";
import axios from "axios";
import { getAllCategories, createSet } from "../services/api";

const CreateSet = () => {
  const navigate = useNavigate();
  const { user, clearUserInfo } = useUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [cards, setCards] = useState([
    { front: "", back: "" },
    { front: "", back: "" },
    { front: "", back: "" },
  ]);

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch((err) => {
        console.error(err.response.data.message);
      });
  }, []);

  useEffect(() => {
    // display upon redirect to login page
    if (!user) {
      toast.info("Login to create set.");
    }
  }, [user]);

  // If user is not logged-in, redirect to login page
  if (!user) return <Navigate to="/login" replace={true} />;

  const handleSubmit = (event) => {
    event.preventDefault();
    const setFormData = {
      title,
      description,
      category_id: selectedCategory.id,
      private: isPrivate,
    };

    createSet({ setFormData, cardFormData: cards })
      .then((res) => {
        if (res.status === 201) {
          toast.success(res.data.message, { position: "top-center" });
          navigate("/profile");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.info(err.response.data.message);
          clearUserInfo();
          return navigate("/login");
        } else {
          toast.error(err.response.data.message);
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

  const handleCardUpdate = (index, e) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[index][e.target.name] = e.target.value;
      return updatedCards;
    });
  };

  const handleCardDelete = (cardIndex) => {
    if (cards.length === 1)
      return toast.info("There should be at least one card");

    const updatedCards = [...cards];
    updatedCards.splice(cardIndex, 1);
    setCards(updatedCards);
  };

  return (
    <main className="create-container">
      <Form>
        <div className="set-container">
          <div className="set-header-container">
            <h1>Create a New Set</h1>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Create
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

        {cards.map((card, index) => (
          <CardForm
            key={index}
            card={card}
            onUpdate={(e) => handleCardUpdate(index, e)}
            onDelete={() => handleCardDelete(index)}
          />
        ))}
        <div className="footer-button-container">
          <Button onClick={addCard}>Add Card</Button>
        </div>
      </Form>
    </main>
  );
};

export default CreateSet;
