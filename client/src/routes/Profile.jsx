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

  useEffect(() => {
    const userDataCall = axios.get(`/api/users/${user.id}`)
    const setDataCall = axios.get(`/api/sets/user/${user.id}`)

    Promise.all([userDataCall, setDataCall])
      .then(([userData, setData]) => {
        setName(userData.data)
        setSets(setData.data);
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
          <p>Hello</p>
          {sets.map(set => (
            <SetItem set={set} user={name.username}/>
          ))}
        </Tab>
        <Tab eventKey="favorite-sets" title="Favorite Sets">
          <p>Favorites</p>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Profile