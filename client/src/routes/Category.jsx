import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SetItem from "../components/SetItem";
import axios from "axios";
import { useUser } from "../context/UserProvider";
import useDeleteButton from "../hooks/useDeleteButton";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import "../assets/styles/Category.scss"

const Category = () => {
  const [setsData, setSetsData] = useState(null);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { categoryId } = useParams();
  const { user, favoriteSets } = useUser();
  const { deleteSet } = useDeleteButton();

  useEffect(() => {
    axios
      .get(`/api/categories/${categoryId}`)
      .then((res) => {
        setCategory(res.data.category);
        setSetsData(res.data.sets);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [categoryId]);

  if (isLoading) {
    return (
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (!category) return <h1>Category Not Found</h1>;

  const setsElements =
    Array.isArray(setsData) &&
    setsData.map((set) => (
      <SetItem
        key={set.id}
        set={set}
        setOwner={set.username}
        user={user}
        initiallyLiked={favoriteSets.some((favorite) => favorite.id === set.id)}
        onDelete={() => deleteSet(set.id, setsData, setSetsData)}
      />
    ));

  return (
    <div className="Category-container">
      <h1>
        Category: <span>{category}</span>
      </h1>
      {setsData.length === 0 ? (
        <h2>There are currently no sets in this category.</h2>
      ) : (
        <section>{setsElements}</section>
      )}
    </div>
  );
};

export default Category;
