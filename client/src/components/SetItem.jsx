import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


const SetItem = (props) => {
  const { name, owner, handleFavoriteClick } = props

  return (
    <div className="set-item-container">
      <h1>{'Set Name'}</h1>
      <div className="set-item-right">
        <FontAwesomeIcon icon={faHeart} onClick={handleFavoriteClick} />
        <h2>{'Set Owner'}</h2>
      </div>
    </div>
  )
}

export default SetItem;