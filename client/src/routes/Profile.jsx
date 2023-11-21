import { useEffect, useState } from "react";
import SetItem from "../components/SetItem";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import { useUser } from "../context/UserProvider";
import { Navigate } from "react-router-dom";
import "../assets/styles/profile.scss";

const Profile = () => {
  const { user, favoriteSets } = useUser();
  const [sets, setSets] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/sets/user/${user.id}`)
        .then((res) => {
          const userSets = (res.data).filter(set => set.deleted !== true)
          setSets(userSets);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  const handleDelete = (setId) => {
    const updatedSets = sets.filter(set => set.id !== setId);
    setSets(updatedSets);
  };

  // Redirect to login page
  if (!user) return <Navigate to="/login" replace={true} />;

  return (
    <div className="profile-container">
      <h1>{user.username}</h1>
      <Tabs defaultActiveKey="my-sets">
        <Tab eventKey="my-sets" title="My Sets">
          {sets.map((set) => (
            <SetItem
              key={set.id}
              set={set}
              user={user}
              setOwner={user.username}
              initiallyLiked={favoriteSets.some(
                (favorite) => favorite.id === set.id
              )}
              onDelete={handleDelete}
            />
          ))}
        </Tab>
        <Tab eventKey="favorite-sets" title="Favorite Sets">
          {favoriteSets.map((favorite) => (
            <SetItem
              key={favorite.id}
              set={favorite}
              user={user}
              setOwner={favorite.username}
              initiallyLiked={true}
              onDelete={handleDelete}
            />
          ))}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile;
