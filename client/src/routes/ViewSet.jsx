import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFavButton from "../hooks/useFavButton";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Cards from "../components/Cards";
import EditCardModal from "./EditCardModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fillHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useUser } from "../context/UserProvider";
import "../assets/styles/ViewSet.scss";
import "../assets/styles/icons.scss";

const ViewSet = () => {
  const { setId } = useParams();
  const [setData, setSetData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const { isLiked, checkLiked, toggleLike } = useFavButton();
  const { user, favoriteSets } = useUser();

  useEffect(() => {
    axios
      .get(`/api/sets/${setId}`)
      .then((res) => setSetData(res.data))
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
    // check whether the current set is liked by the logged in user
    checkLiked(favoriteSets, Number(setId));
  }, [setId]);

  const handleCardEdit = (card) => {
    setEditingCard(card);
    setShowEditModal(true);
  };

  const handleCardUpdate = (updatedCard) => {
    setSetData((prevData) => {
      const newCards = prevData.cards.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      );
      return { ...prevData, cards: newCards };
    });
    setShowEditModal(false);
  };

  if (isLoading) {
    return (
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (!setData) {
    return (
      <main className="SetNotFound">
        <h2>Set Not Found</h2>
      </main>
    );
  }

  const { set, cards } = setData;

  if (set.private) {
    return (
      <main className="PrivateSet">
        <h2>This set is marked as private.</h2>
      </main>
    );
  }

  return (
    <main className="ViewSet">
      <section className="d-flex justify-content-between align-items-end">
        <div className="d-flex gap-2 align-items-end">
          <h1>{set.title}</h1>
          <h2>{set.category_name}</h2>
          {user && (
            <Button variant="link" onClick={() => toggleLike(user.id, setId)}>
              {isLiked ? (
                <FontAwesomeIcon
                  icon={fillHeart}
                  className="icon-primary heart-icon"
                />
              ) : (
                <FontAwesomeIcon
                  icon={emptyHeart}
                  className="icon-primary heart-icon"
                />
              )}
            </Button>
          )}
        </div>
        {user && user.id === set.user_id && (
          <Button variant="primary" href={`/sets/edit/${setId}`}>
            Edit Set
          </Button>
        )}
      </section>

      <Cards
        cards={cards}
        isSetOwner={user && user.id === set.user_id}
        onEdit={handleCardEdit}
      />

      {/* Edit Card Modal */}
      {editingCard && (
        <EditCardModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          card={editingCard}
          onUpdate={handleCardUpdate}
        />
      )}
      
      <section className="set-info d-flex gap-2">
        <p>{set.username}</p>
        <div className="description">
          <h3>Description:</h3>
          <p>{set.description}</p>
        </div>
      </section>
    </main>
  );
};

export default ViewSet;
