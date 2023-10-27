import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <header>
      Navbar
      <Link to="/">Home</Link>
      <Link to="/category">Category</Link>
    </header>
  );
};

export default Navbar;
