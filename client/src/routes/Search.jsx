import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SetItem from "../components/SetItem";
import useSetsList from "../hooks/useSetsList";
import { useUser } from "../context/UserProvider";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import "../assets/styles/Search.scss";
import { searchSets } from "../services/api";

const Search = () => {
  const [searchParams] = useSearchParams();
  const { user } = useUser();

  const { sets, setSets, deleteSet } = useSetsList();
  const [isLoading, setIsLoading] = useState(true);

  const query = searchParams.get("query");

  useEffect(() => {
    setIsLoading(true);
    searchSets(query)
      .then(setSets)
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [query]);

  if (isLoading) {
    return (
      <main className="search-container">
        <h1>
          Search Results for &quot;<span>{query}</span>&quot;
        </h1>
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Searching...</span>
        </Spinner>
      </main>
    );
  }

  // If a set is marked private, it will only show up in the search if the current user is the set owner
  const displaySet = sets.filter((set) => {
    if (set.private) {
      if (user && user.id === set.user_id) return set;
    } else {
      return set;
    }
  });

  return (
    <main className="search-container">
      <h1>
        Search Results for &quot;<span>{query}</span>&quot;
      </h1>
      {displaySet.length > 0 ? (
        displaySet.map((set) => (
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
    </main>
  );
};

export default Search;
