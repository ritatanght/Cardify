import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";
import { useUser } from "../context/UserProvider";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Dropdown from "react-bootstrap/Dropdown";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import "../assets/styles/EditSet.scss";

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

    setIsLoading(true);
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
  }, [setId]);

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
      .put(`/api/sets/edit/${setId}`, { setFormData, cardFormData: cards })
      .then((res) => {
        if (res.status === 200) {
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
      <main>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </main>
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
    return (
      <main>
        <h1>Sorry, you don&apos;t have permission to edit this set!</h1>;
      </main>
    );
  }

  return (
    <div className="create-container">
      <Form>
        <div className="set-container">
          <div className="set-header-container">
            <h1>Edit: {title}</h1>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Save
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
              <CardForm
                key={index}
                card={card}
                onUpdate={(e) => handleCardUpdate(index, e)}
                onDelete={() => handleCardDelete(index)}
              />
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
