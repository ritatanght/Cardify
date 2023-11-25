import { useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserProvider";
import { toast } from "react-toastify";

const useFavButton = (initialState = false) => {
  const [isLiked, setIsLiked] = useState(initialState);
  const { updateFavoriteSets, clearUserInfo } = useUser();

  const toggleLike = (setId) => {
    if (isLiked) {
      // Unlike a set
      axios
        .delete(`/api/favorites/${setId}`)
        .then(({ status }) => {
          if (status === 200) {
            updateFavoriteSets();
            setIsLiked(false);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            toast.info(err.response.data.message);
            clearUserInfo();
          } else {
            toast.error(err);
          }
        });
    } else {
      // Like a set
      axios
        .post(`/api/favorites/${setId}`)
        .then(({ status }) => {
          if (status === 201) {
            updateFavoriteSets();
            setIsLiked(true);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            toast.info(err.response.data.message);
            clearUserInfo();
          } else {
            toast.error(err);
          }
        });
    }
  };

  const checkLiked = (favoriteSets, currentSetId) => {
    setIsLiked(favoriteSets.some((set) => set.id === currentSetId));
  };

  return { isLiked, setIsLiked, toggleLike, checkLiked };
};

export default useFavButton;
