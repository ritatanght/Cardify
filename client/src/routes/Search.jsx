import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SetItem from "../components/SetItem";
import { useUser } from "../context/UserProvider";
import useSetsList from "../hooks/useSetsList";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import "../assets/styles/Search.scss";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  
  const { sets, setSets, deleteSet } = useSetsList();
  const [isLoading, setIsLoading] = useState(true);
  const { user, favoriteSets } = useUser();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/search?query=${encodeURIComponent(query)}`)
      .then((res) => {
        setSets(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  }, [query]);

  if (isLoading) {
    return (
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Searching...</span>
      </Spinner>
    );
  }

  return (
    <div className="search-container">
      <h1>
        Search Results for &quot;<span>{query}</span>&quot;
      </h1>
      {sets.length > 0 ? (
        sets.map((set) => (
          <SetItem
            key={set.id}
            set={set}
            setOwner={set.username}
            onDelete={() => deleteSet(set.id)}
          />
        ))
      ) : (
        <h1 className="no-results">Couldn&apos;t find anything!</h1>
      )}
    </div>
  );
};

export default Search;
