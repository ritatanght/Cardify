import { useState } from "react";
import axios from "axios";

const useDeleteButton = (initialSets = []) => {
  const [sets, setSets] = useState(initialSets)

  const deleteSet = (setId) => {
    axios.delete(`/api/sets/delete/${setId}`)
      .then(() => {
        const updatedSets = sets.filter(set => set.id !== setId);
        setSets(updatedSets)
      })
      .catch(err => {
        console.error('Error deleting the set: ', err)
      })
  }

  return { sets, deleteSet }
}

export default useDeleteButton;