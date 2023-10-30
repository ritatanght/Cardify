import React from "react";
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

const Profile = (props) => {
  return (
    <div className="profile-container">
      <h2>Username</h2>
      <Tabs defaultActiveKey='My Sets'>
        <Tab>
          My Sets
        </Tab>
      </Tabs>
    </div>
  )
}