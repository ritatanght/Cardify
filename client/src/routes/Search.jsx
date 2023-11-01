import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useLocation } from "react-router-dom";
import SetItem from '../components/SetItem'
import { useUser } from "../context/UserProvider";

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
      .then(response => {
        setSearchSets(response.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error(err)
      })
  }, [query])

  if (isLoading) {
    return <h1>Searching...</h1>
  }

  return (
    <div className="search-container">
      <h1>Search Results for "{query}"</h1>
      {searchSets.length > 0 ?
        searchSets.map(set => (
          <SetItem
            key={set.id}
            set={set}
            user={user}
            setOwner={set.username}
            initiallyLiked={favoriteSets.some(favorite => favorite.id === set.id)}
          />
        ))
        :
        <h1>Couldn't find anything!</h1>
      }
    </div>
  )
}

export default Search