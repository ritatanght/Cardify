import React, { useEffect } from "react";
import useFavButton from '../hooks/useFavButton';
import useDeleteButton from "../hooks/useDeleteButton";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fillHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons"
import Button from "react-bootstrap/esm/Button";
import '../assets/styles/setItem.scss'

const SetItem = (props) => {
  const { set, user, setOwner, initiallyLiked } = props;
  const { isLiked, setIsLiked, toggleLike } = useFavButton();
  const { deleteSet } = useDeleteButton()

  useEffect(() => {
    setIsLiked(initiallyLiked)
  }, [setIsLiked])

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
            <FontAwesomeIcon icon={fillHeart} />
          ) : (
            <FontAwesomeIcon icon={emptyHeart} />
          )}
        </Button>
        {user.username === setOwner ? (
          <div className="set-icons">
            <Button variant="link" href={`/sets/edit/${set.id}`}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
            <Button variant="link" onClick={handleDeleteClick}>
              <FontAwesomeIcon icon={faTrashCan} />
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
