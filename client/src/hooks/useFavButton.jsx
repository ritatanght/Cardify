import { useState } from "react";
import axios from "axios";

const useFavButton = (initialState = false) => {
  const [isLiked, setIsLiked] = useState(initialState);

  const toggleLike = (userId, setId) => {
    if (isLiked) {
      // Unlike a set
      axios
        .put("/api/favorites", { userId, setId })
        .then(({ status }) => {
          if (status === 200) {
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
            setIsLiked(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return { isLiked, setIsLiked, toggleLike };
};

export default useFavButton;
