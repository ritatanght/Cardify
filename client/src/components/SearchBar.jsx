import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const navigate = useNavigate();
  const [queryString, setQueryString] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (queryString) return navigate(`/search?query=${encodeURIComponent(queryString)}`);
  };

  return (
    <div className="SearchBar">
      <InputGroup>
        <Form.Control
          name="query"
          placeholder="Search"
          aria-label="Search"
          value={queryString}
          onChange={(e) => setQueryString(e.target.value)}
        />
        <Button onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </InputGroup>
    </div>
  );
};

export default SearchBar;
