import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFavButton from "../hooks/useFavButton";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Cards from "../components/Cards";
import EditCardModal from "./EditCardModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fillHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useUser } from "../context/UserProvider";

const ViewSet = () => {
  const { setId } = useParams();
  const [setData, setSetData] = useState(null);
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
      });
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

  if (!setData) return <h2>Loading...</h2>;

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
      <section className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2 align-items-center">
          <h1>{set.title}</h1>
          <h2>
            <Badge bg="secondary">{set.category_name}</Badge>
          </h2>
          {user && (
            <Button variant="link" onClick={() => toggleLike(user.id, setId)}>
              {isLiked ? (
                <FontAwesomeIcon icon={fillHeart} />
              ) : (
                <FontAwesomeIcon icon={emptyHeart} />
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


      <Cards cards={cards} isSetOwner={user && user.id === set.user_id} onEdit={handleCardEdit} />

      {/* Edit Card Modal */}
      {editingCard && <EditCardModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        card={editingCard}
        onUpdate={handleCardUpdate}
      />}
        
        
      <section className="d-flex gap-2">
        <p>{set.username}</p>
        <p>{set.description}</p>
      </section>
    </main>
  );
};

export default ViewSet;
