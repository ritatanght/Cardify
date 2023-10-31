import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SetItem from "../components/SetItem";
import axios from "axios";

const currentUser = {
  id: 1,
  username: "testUser1",
  email: "rick.sandchez@gmail.com",
};

const Category = () => {
  const [setsData, setSetsData] = useState(null);
  const [category, setCategory] = useState("");
  const [favoriteSets, setFavoriteSets] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const setDataPromise = axios.get(`/api/categories/${categoryId}`);
    const userFavPromise = axios.get(`/api/favorites/${currentUser.id}`);

    Promise.all([setDataPromise, userFavPromise])
      .then(([setsData, userFavData]) => {
        setCategory(setsData.data.category);
        setSetsData(setsData.data.sets);
        setFavoriteSets(userFavData.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [categoryId]);

  if (!category) return <h1>Category Not Found</h1>;
  if (!setsData) return <>Loading...</>;

  const setsElements =
    Array.isArray(setsData) &&
    setsData.map((set) => (
      <SetItem
        key={set.id}
        set={set}
        user={{ username: set.username }}
        initiallyLiked={favoriteSets.some((favorite) => favorite.id === set.id)}
        currentUser={currentUser}
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
