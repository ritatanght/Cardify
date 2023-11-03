import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useLocation } from "react-router-dom";
import SetItem from '../components/SetItem'
import { useUser } from "../context/UserProvider";
import Spinner from "react-bootstrap/Spinner";
import "../assets/styles/Search.scss";

const Search = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const [searchSets, setSearchSets] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const { user, favoriteSets } = useUser();

  useEffect(() => {
    setIsLoading(true)
    axios.get(`/api/search?query=${encodeURIComponent(query)}`)
      .then(res => {
        const userSets = (res.data).filter(set => set.deleted !== true)
        setSearchSets(userSets)
        setIsLoading(false)
      })
      .catch(err => {
        console.error(err)
      })
  }, [query])

  const handleDelete = (setId) => {
    const updatedSets = searchSets.filter(set => set.id !== setId);
    setSearchSets(updatedSets);
  };

  if (isLoading) {
    return (
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Searching...</span>
      </Spinner>
    );
  }

  return (
    <div className="search-container">
      <h1>Search Results for "<span>{query}</span>"</h1>
      {searchSets.length > 0 ?
        searchSets.map(set => (
          <SetItem
            key={set.id}
            set={set}
            user={user}
            setOwner={set.username}
            initiallyLiked={favoriteSets.some(favorite => favorite.id === set.id)}
            onDelete={handleDelete}
          />
        ))
        :
        <h1 className="no-results">Couldn't find anything!</h1>
      }
    </div>
  )
}

export default Search