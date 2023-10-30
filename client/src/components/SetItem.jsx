import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import '../assets/styles/setItem.scss'


const SetItem = (props) => {
  const { set, user, handleFavoriteClick } = props

  return (
    <div className="set-item-container">
      <Link to={`/sets/${set.id}`}>
        <h2>{set.title}</h2>
      </Link>
      <div className="set-item-right">
        <FontAwesomeIcon className='fav-icon' icon={faHeart} onClick={() => handleFavoriteClick()} />
        <h2>{user}</h2>
      </div>
    </div>
  )
}

export default SetItem;