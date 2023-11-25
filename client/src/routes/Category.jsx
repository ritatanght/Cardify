import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SetItem from "../components/SetItem";
import useSetsList from "../hooks/useSetsList";
import { useUser } from "../context/UserProvider";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import "../assets/styles/Category.scss";

const Category = () => {
  const { categoryId } = useParams();
  const { user } = useUser();
  const { sets, setSets, deleteSet } = useSetsList();

  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/categories/${categoryId}`)
      .then((res) => {
        setCategory(res.data.category);
        setSets(res.data.sets);
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

  if (!category)
    return (
      <main>
        <h1 className="text-center">Category Not Found</h1>
      </main>
    );

  // If a set is marked private, it will only show up in the search if the current user is the set owner
  const displaySet = sets.filter((set) => {
    if (set.private) {
      if (user && user.id === set.user_id) return set;
    } else {
      return set;
    }
  });

  const setsElements =
    Array.isArray(displaySet) &&
    displaySet.map((set) => (
      <SetItem
        key={set.id}
        set={set}
        setOwner={set.username}
        onDelete={() => deleteSet(set.id)}
      />
    ));

  return (
    <div className="Category-container">
      <h1>
        Category: <span>{category}</span>
      </h1>
      {displaySet.length === 0 ? (
        <h2>There are currently no sets in this category.</h2>
      ) : (
        <section>{setsElements}</section>
      )}
    </div>
  );
};

export default Category;
