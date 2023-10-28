import { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SearchBar from "./SearchBar";
import Button from "react-bootstrap/Button";

// To be edited
const user = false;

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
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
          {user ? (
            <Button variant="primary">Sign Out</Button>
          ) : (
            <>
              <Button variant="primary">Login</Button>
              <Button variant="primary">Sign Up</Button>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
