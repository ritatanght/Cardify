import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const SearchBar = ({ closeMenu }) => {
  const navigate = useNavigate();
  const [queryString, setQueryString] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!queryString) return toast.info("Please enter keyword for search");

    setQueryString("");
    closeMenu();
    return navigate(`/search?query=${encodeURIComponent(queryString)}`);
  };

  // pressing enter when focusing on the input field will submit the keyword for search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
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
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </InputGroup>
    </div>
  );
};

export default SearchBar;
