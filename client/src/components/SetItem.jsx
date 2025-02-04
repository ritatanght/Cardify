import { useEffect } from "react";
import { Link } from "react-router-dom";
import useFavButton from "../hooks/useFavButton";
import { useUser } from "../context/UserProvider";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fillHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import "../assets/styles/SetItem.scss";

const SetItem = ({ set, setOwner, onDelete }) => {
  const { user, favoriteSets } = useUser();
  const { isLiked, toggleLike, checkLiked } = useFavButton();

  useEffect(() => {
    checkLiked(favoriteSets, set.id);
  }, [checkLiked, favoriteSets, set.id]);

  return (
    <div className="set-item-container">
      <Link to={`/sets/${set.id}`}>
        <p>{set.title}</p>
      </Link>
      <div className="set-item-right">
        {user && user.id === set.user_id ? (
          <div className="set-icons">
            <Button variant="link" onClick={onDelete}>
              <FontAwesomeIcon icon={faTrashCan} className="icon-primary" />
            </Button>
            <Button variant="link" href={`/sets/edit/${set.id}`}>
              <FontAwesomeIcon icon={faPenToSquare} className="icon-primary" />
            </Button>
          </div>
        ) : (
          <span>{setOwner}</span>
        )}
        {user && (
          <Button variant="link" onClick={() => toggleLike(set)}>
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
    </div>
  );
};

export default SetItem;
