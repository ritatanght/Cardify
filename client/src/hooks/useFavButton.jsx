import { useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserProvider";
import { toast } from "react-toastify";

const useFavButton = (initialState = false) => {
  const [isLiked, setIsLiked] = useState(initialState);
  const { addToFavList, removeFromFavList, clearUserInfo } = useUser();

  const toggleLike = (set) => {
    if (isLiked) {
      // Unlike a set
      axios
        .delete(`/api/favorites/${set.id}`)
        .then(({ status }) => {
          if (status === 200) {
            removeFromFavList(set.id);
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
        .post(`/api/favorites/${set.id}`)
        .then(({ status }) => {
          if (status === 201) {
            addToFavList(set);
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
