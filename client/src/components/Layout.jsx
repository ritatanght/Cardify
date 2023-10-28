import { Outlet } from "react-router-dom";
import Header from "./Header";
import SetItem from "./SetItem"

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <SetItem />
    </>
  );
};

export default Layout;
