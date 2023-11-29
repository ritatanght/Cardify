import { createContext, useContext, useState, useEffect } from "react";
import { getUserFavorites, logOutUser } from "../services/api";

export const userContext = createContext();

export const useUser = () => {
  return useContext(userContext);
};

const UserProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );
  const [favoriteSets, setFavoriteSets] = useState(
    JSON.parse(localStorage.getItem("favoriteSets")) || []
  );

  useEffect(() => {
    if (user) {
      getUserFavorites()
        .then(setFavoriteSets)
        .catch((err) => {
          if (err.response.status === 401) {
            clearUserInfo();
          } else {
            console.error(err);
          }
        });
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("favoriteSets", JSON.stringify(favoriteSets));
  }, [favoriteSets]);

  /**
   * store the userObject in state and local storage
   * @param {id, username, email} userInfo
   */
  const storeUserInfo = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem("loggedInUser", JSON.stringify(userInfo));
  };

  const clearUserInfo = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
    setFavoriteSets([]);
    localStorage.removeItem("favoriteSets");
  };

  const logout = () => {
    logOutUser().then((res) => {
      if (res.status === 200) {
        clearUserInfo();
      }
    });
  };

  const addToFavList = (set) => {
    const { id, title, user_id, username, private: isPrivate } = set;
    const newSet = { id, title, user_id, username, private: isPrivate };
    setFavoriteSets((prev) => [...prev, newSet]);
  };

  const removeFromFavList = (setId) =>
    setFavoriteSets((prevSet) => prevSet.filter((set) => set.id !== setId));

  const userData = {
    user,
    favoriteSets,
    addToFavList,
    removeFromFavList,
    logout,
    storeUserInfo,
    clearUserInfo,
  };

  return (
    <userContext.Provider value={userData}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserProvider;
