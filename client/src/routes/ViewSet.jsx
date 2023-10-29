import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fillHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

// To be updated
const user = { id: 1 };

const ViewSet = () => {
  const { setId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [setData, setSetData] = useState(null);

  useEffect(() => {
    const setDataPromise = axios.get(`/api/sets/${setId}`);
    const userFavPromise = axios.get(`/api/favorites/${user.id}`);

    Promise.all([setDataPromise, userFavPromise])
      .then(([setData, userFavData]) => {
        setSetData(setData.data);
        setIsLiked(userFavData.data.includes(Number(setId)));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [setId]);

  const toggleLike = () => {
    if (isLiked) {
      axios
        .put("/api/favorites", { userId: user.id, setId })
        .then(({ status }) => {
          if (status === 200) {
            setIsLiked(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .post("/api/favorites", { userId: user.id, setId })
        .then(({ status }) => {
          if (status === 201) {
            setIsLiked(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  if (!setData) return <>Loading...</>;

  const { set, cards } = setData;

  return (
    <main className="ViewSet">
      <section className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2 align-items-center">
          <h1>{set.title}</h1>
          <h2>
            <Badge bg="secondary">{set.category_name}</Badge>
          </h2>
          {user.id && (
            <Button variant="link" onClick={toggleLike}>
              {isLiked ? (
                <FontAwesomeIcon icon={fillHeart} />
              ) : (
                <FontAwesomeIcon icon={emptyHeart} />
              )}
            </Button>
          )}
        </div>
        {user.id === set.user_id && (
          <Button variant="primary" href={`/sets/edit/${setId}`}>
            Edit Set
          </Button>
        )}
      </section>

      <Card />

      <section className="d-flex gap-2">
        <p>{set.username}</p>
        <p>{set.description}</p>
      </section>
    </main>
  );
};

export default ViewSet;
