import { useEffect, useState } from "react";
import SetItem from "../components/SetItem";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import { useUser } from "../context/UserProvider";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user, favoriteSets } = useUser();
  const [sets, setSets] = useState([]);
  
  useEffect(() => {
    if (user) {
      axios
        .get(`/api/sets/user/${user.id}`)
        .then((res) => {
          setSets(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  // Redirect to homepage for now
  if (!user) return <Navigate to="/" replace={true} />;

  return (
    <div className="profile-container">
      <h3>{user.username}</h3>
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
            />
          ))}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile;
