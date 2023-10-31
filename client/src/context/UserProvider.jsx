import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const userContext = createContext();

export const useUser = () => {
  return useContext(userContext);
};

// the user to login when login button is clicked
const userId = 1;

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [favoriteSets, setFavoriteSets] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/favorites/${user.id}`)
        .then((res) => {
          setFavoriteSets(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  // Perform login process for the user using the userId hardcoded above
  const login = () => {
    axios
      .get(`/api/users/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error(err);
      });
  };

  const logout = () => {
    setUser(null);
  };

  const userData = { user, favoriteSets, login, logout };

  return (
    <userContext.Provider value={userData}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserProvider;
