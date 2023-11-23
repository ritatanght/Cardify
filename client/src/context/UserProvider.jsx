import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

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
      updateFavoriteSets();
    }
  }, [user]);

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
    axios.post(`/api/auth/logout`).then((res) => {
      if (res.status === 200) {
        clearUserInfo();
      }
    });
  };

  const updateFavoriteSets = () => {
    axios
      .get("/api/favorites/")
      .then((res) => {
        setFavoriteSets(res.data);
        localStorage.setItem("favoriteSets", JSON.stringify(res.data));
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error(err.response.data.message);
          clearUserInfo();
        } else {
          console.error(err);
        }
      });
  };

  const userData = {
    user,
    favoriteSets,
    updateFavoriteSets,
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
