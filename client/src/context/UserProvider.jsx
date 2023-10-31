import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const userContext = createContext();

export const useUser = () => {
  return useContext(userContext);
};

// the user to login when login button is clicked
const userId = 1;

const UserProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );
  const [favoriteSets, setFavoriteSets] = useState(
    JSON.parse(localStorage.getItem("favoriteSets")) || []
  );

  useEffect(() => {
    if (user) {
      updateFavoriteSets()
    }
  }, [user]);

  // Perform login process for the user using the userId hardcoded above
  const login = () => {
    axios
      .get(`/api/users/${userId}`)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("loggedInUser", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
    setFavoriteSets([]);
    localStorage.removeItem("favoriteSets");
  };

  const updateFavoriteSets = () => {
    axios
      .get(`/api/favorites/${user.id}`)
      .then((res) => {
        setFavoriteSets(res.data);
        localStorage.setItem("favoriteSets", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const userData = { user, favoriteSets, updateFavoriteSets, login, logout };

  return (
    <userContext.Provider value={userData}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserProvider;
