import useFavButton from '../hooks/useFavButton';
import useDeleteButton from "../hooks/useDeleteButton";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fillHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons"
import Button from "react-bootstrap/esm/Button";
import '../assets/styles/SetItem.scss'
import '../assets/styles/icons.scss'

const SetItem = (props) => {
  const { set, user, setOwner, initiallyLiked } = props;
  const { isLiked, toggleLike } = useFavButton(initiallyLiked);
  const { deleteSet } = useDeleteButton()

  const handleLikeClick = () => {
    toggleLike(user.id, set.id);
  }

  const handleDeleteClick = () => {
    deleteSet(set.id)
    props.onDelete(set.id)
  }

  return (
    <div className="set-item-container">
      <Link to={`/sets/${set.id}`}>
        <h2>{set.title}</h2>
      </Link>
      <div className="set-item-right">
        <Button variant="link" onClick={() => handleLikeClick()}>
          {isLiked ? (
            <FontAwesomeIcon icon={fillHeart} className="icon-primary heart-icon" />
          ) : (
            <FontAwesomeIcon icon={emptyHeart} className="icon-primary heart-icon" />
          )}
        </Button>
        {user.id === set.user_id ? (
          <div className="set-icons">
            <Button variant="link" href={`/sets/edit/${set.id}`}>
              <FontAwesomeIcon icon={faPenToSquare} className="icon-primary" />
            </Button>
            <Button variant="link" onClick={handleDeleteClick}>
              <FontAwesomeIcon icon={faTrashCan} className="icon-primary" />
            </Button>
          </div>
        ) : (
          <h2>{setOwner}</h2>
        )}
      </div>
    </div>
  )
}

export default SetItem;
