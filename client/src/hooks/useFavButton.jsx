import { useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserProvider";

const useFavButton = () => {
  const [isLiked, setIsLiked] = useState(false);
  const { updateFavoriteSets } = useUser();

  const toggleLike = (userId, setId) => {
    if (isLiked) {
      // Unlike a set
      axios
        .put("/api/favorites", { userId, setId })
        .then(({ status }) => {
          if (status === 200) {
            updateFavoriteSets();
            setIsLiked(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // Like a set
      axios
        .post("/api/favorites", { userId, setId })
        .then(({ status }) => {
          if (status === 201) {
            updateFavoriteSets();
            setIsLiked(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const checkLiked = (favoriteSets, currentSetId) => {
    setIsLiked(favoriteSets.some((set) => set.id === currentSetId));
  };

  return { isLiked, setIsLiked, toggleLike, checkLiked };
};

export default useFavButton;
