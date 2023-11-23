import { useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "../context/UserProvider";
import axios from "axios";

const useDeleteButton = (initialSets = []) => {
  const { clearUserInfo } = useUser();
  const [sets, setSets] = useState(initialSets);

  const deleteSet = (setId) => {
    axios
      .delete(`/api/sets/delete/${setId}`)
      .then((res) => {
        if (res.status === 200) {
          const updatedSets = sets.filter((set) => set.id !== setId);
          setSets(updatedSets);
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.info(err.response.data.message);
          clearUserInfo();
          //return navigate("/login");
        } else {
          console.error("Error deleting the set: ", err);
        }
      });
  };

  return { sets, deleteSet };
};

export default useDeleteButton;
