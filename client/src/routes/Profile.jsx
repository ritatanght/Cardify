import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import SetItem from "../components/SetItem";
import useSetsList from "../hooks/useSetsList";
import { useUser } from "../context/UserProvider";
import { toast } from "react-toastify";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "../assets/styles/Profile.scss";
import axios from "axios";

const Profile = () => {
  const { user, favoriteSets, clearUserInfo } = useUser();
  const { sets, setSets, deleteSet } = useSetsList();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      axios
        .get("/api/sets/user")
        .then((res) => {
          const userSets = res.data.filter((set) => set.deleted !== true);
          setSets(userSets);
        })
        .catch((err) =>
          err.response.status === 401 ? clearUserInfo() : toast.error(err)
        )
        .finally(() => setIsLoading(false));
    } else {
      // display upon redirect to login page
      toast.info("Login to view your profile.");
    }
  }, [user]);

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
                onDelete={() => deleteSet(set.id)}
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
            favoriteSets.map((favoriteSet) => (
              <SetItem
                key={favoriteSet.id}
                set={favoriteSet}
                setOwner={favoriteSet.username}
                onDelete={() => deleteSet(favoriteSet.id)}
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
