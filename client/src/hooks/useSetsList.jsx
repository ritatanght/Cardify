import { toast } from "react-toastify";
import { useUser } from "../context/UserProvider";
import axios from "axios";
import { useState } from "react";

const useSetsList = () => {
  const [sets, setSets] = useState([]);
  const { clearUserInfo, removeDeletedFromFavList } = useUser();

  const deleteSet = (setId) => {
    axios
      .delete(`/api/sets/delete/${setId}`)
      .then((res) => {
        if (res.status === 200) {
          const updatedSets = sets.filter((set) => set.id !== setId);
          setSets(updatedSets);
          removeDeletedFromFavList(setId);
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.info(err.response.data.message);
          clearUserInfo();
        } else {
          console.error("Error deleting the set: ", err);
        }
      });
  };

  return { sets, setSets, deleteSet };
};

export default useSetsList;
