import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { useUser } from "../context/UserProvider";
import { ToastContainer } from "react-toastify";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/Header.scss";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/images/logo.png";
import axios from "axios";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const { user, logout } = useUser();

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
    <header className="px-4">
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar>
        <Navbar.Brand href="/">
          <img src={Logo} alt="cardify" />
        </Navbar.Brand>
        <NavDropdown title="Categories" id="nav-dropdown">
          {dropDownItems}
        </NavDropdown>

        <Navbar.Collapse className="justify-content-end">
          <SearchBar />
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end right">
          {user ? (
            <>
              <Button variant="link" className="profile-btn" href="/profile">
                <FontAwesomeIcon icon={faUser} />
              </Button>
              <Button variant="primary" onClick={logout}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary" href="/login">
                Login
              </Button>
              <Button variant="primary" href="/register">
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
