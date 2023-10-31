import { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SearchBar from "./SearchBar";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// To be updated
const user = { id: 1, username: "testUser1", email: "rick.sandchez@gmail.com" };

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api/categories").then((res) => setCategories(res.data));
  }, []);

  const dropDownItems =
    Array.isArray(categories) &&
    categories.map((category) => (
      <NavDropdown.Item key={category.name} href={`/categories/${category.id}`}>
        {category.name}
      </NavDropdown.Item>
    ));

  return (
    <header className="px-4 border-bottom">
      <Navbar>
        <Navbar.Brand href="/">FlashCards</Navbar.Brand>
        <NavDropdown title="Categories" id="nav-dropdown">
          {dropDownItems}
        </NavDropdown>

        <Navbar.Collapse className="justify-content-end">
          <SearchBar />
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          {user.id ? (
            <>
              <Button variant="link" href={`/users/${user.id}`}>
                <FontAwesomeIcon icon={faUser} />
              </Button>
              <Button variant="primary" href="#">
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary" href="#">
                Login
              </Button>
              <Button variant="primary" href="#">
                Sign Up
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
