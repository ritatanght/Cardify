import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import Home from "./routes/Home";
import Category from "./routes/Category";
import CreateSet from "./routes/CreateSet";
import ViewSet from "./routes/ViewSet";
import Search from "./routes/Search";
import Profile from "./routes/Profile";


function App() {


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Add routes here */}
        <Route index element={<Home />} />
        <Route path="/categories/:categoryId" element={<Category />} />
        <Route path="/sets/create" element={<Sets />} />
        <Route path="/sets/:setId" element={<ViewSet />} />
        <Route path="/search" element={<Search />} />
        <Route path="/users/:userId" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App; 
