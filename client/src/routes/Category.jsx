import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SetItem from "../components/SetItem";
import axios from "axios";
import { useUser } from "../context/UserProvider";

const Category = () => {
  const [setsData, setSetsData] = useState(null);
  const [category, setCategory] = useState("");
  const { categoryId } = useParams();
  const { user, favoriteSets } = useUser();

  useEffect(() => {
    axios
      .get(`/api/categories/${categoryId}`)
      .then((res) => {
        setCategory(res.data.category);
        setSetsData(res.data.sets);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [categoryId]);

  if (!category) return <h1>Category Not Found</h1>;
  if (!setsData) return <h1>Loading...</h1>;

  const setsElements =
    Array.isArray(setsData) &&
    setsData.map((set) => (
      <SetItem
        key={set.id}
        set={set}
        setOwner={set.username}
        user={user}
        initiallyLiked={favoriteSets.some((favorite) => favorite.id === set.id)}
      />
    ));

  return (
    <div className="Category-container">
      <h1>Category: {category}</h1>
      {setsData.length === 0 ? (
        <h2>There are currently no sets in this category.</h2>
      ) : (
        <section>{setsElements}</section>
      )}
    </div>
  );
};

export default Category;
