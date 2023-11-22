import { useEffect, useState } from "react";
import SetItem from "../components/SetItem";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useUser } from "../context/UserProvider";
import { Navigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import "../assets/styles/profile.scss";

const Profile = () => {
  const { user, favoriteSets } = useUser();
  const [sets, setSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      axios
        .get(`/api/sets/user/${user.id}`)
        .then((res) => {
          const userSets = res.data.filter((set) => set.deleted !== true);
          setSets(userSets);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [user]);

  const handleDelete = (setId) => {
    const updatedSets = sets.filter((set) => set.id !== setId);
    setSets(updatedSets);
  };

  // Redirect to login page
  if (!user) return <Navigate to="/login" replace={true} />;

  if (isLoading) {
    return (
      <div className="profile-container">
        <h1>{user.username}</h1>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="d-flex justify-content-between align-items-center">
        <h1>{user.username}</h1>
        <Button className="create-set" variant="primary" href="/sets/create">
          Create Set
        </Button>
      </div>
      <Tabs defaultActiveKey="my-sets">
        <Tab eventKey="my-sets" title="My Sets" className="text-center">
          {sets.length > 0 ? (
            sets.map((set) => (
              <SetItem
                key={set.id}
                set={set}
                setOwner={user.username}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-center empty">
              You don&apos;t have any sets yet.
            </p>
          )}
        </Tab>
        <Tab eventKey="favorite-sets" title="Favorite Sets">
          {favoriteSets.length > 0 ? (
            favoriteSets.map((favorite) => (
              <SetItem
                key={favorite.id}
                set={favorite}
                setOwner={favorite.username}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="text-center empty">
              You have not favorited any sets yet.
            </p>
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile;
