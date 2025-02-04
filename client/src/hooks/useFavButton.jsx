import { useState } from "react";
import { useUser } from "../context/UserProvider";
import { toast } from "react-toastify";
import { likeSet, unlikeSet } from "../services/api";

const useFavButton = (initialState = false) => {
  const [isLiked, setIsLiked] = useState(initialState);
  const { addToFavList, removeFromFavList, clearUserInfo } = useUser();

  const toggleLike = (set) => {
    if (isLiked) {
      // Unlike a set
      unlikeSet(set.id)
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
      likeSet(set.id)
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
