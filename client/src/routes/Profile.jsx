import React from "react";
import { useEffect, useState } from "react";
import SetItem from '../components/SetItem'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import axios from 'axios'

const Profile = () => {
  const user = { id: 1 } //hardcoded for testing

  const [name, setName] = useState('')
  const [sets, setSets] = useState([])
  const [favoriteSets, setFavoriteSets] = useState([])

  useEffect(() => {
    const userDataCall = axios.get(`/api/users/${user.id}`)
    const setDataCall = axios.get(`/api/sets/user/${user.id}`)
    const favoritesDataCall = axios.get(`/api/favorites/${user.id}`)

    Promise.all([userDataCall, setDataCall, favoritesDataCall])
      .then(([userData, setData, favoritesData]) => {
        setName(userData.data)
        setSets(setData.data);
        setFavoriteSets(favoritesData.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])
  

  return (
    <div className="profile-container">
      <h3>{name.username}</h3>
      <Tabs defaultActiveKey='my-sets'>
        <Tab eventKey="my-sets" title="My Sets">
          {sets.map(set => (
            <SetItem key={set.id} set={set} user={name} initiallyLiked={favoriteSets.some(favorite => favorite.id === set.id)}/>
          ))}
        </Tab>
        <Tab eventKey="favorite-sets" title="Favorite Sets">
          {favoriteSets.map(favorite => (
            <SetItem key={favorite.id} set={favorite} user={name} initiallyLiked={true}/>
          ))}
        </Tab>
      </Tabs>
    </div>
  )
}

export default Profile