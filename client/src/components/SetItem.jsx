import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import '../assets/styles/setItem.scss'


const SetItem = (props) => {
  const { set, user, handleFavoriteClick } = props

  return (
    <div className="set-item-container">
      <h2>{set.title}</h2>
      <div className="set-item-right">
        <FontAwesomeIcon className='fav-icon' icon={faHeart} onClick={() => handleFavoriteClick()} />
        <h2>{user.username}</h2>
      </div>
    </div>
  )
}

export default SetItem;