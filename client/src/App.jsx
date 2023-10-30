import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import Home from "./routes/Home";
import Category from "./routes/Category";
import Sets from "./components/Sets";
import ViewSet from "./routes/ViewSet";


function App() {


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Add routes here */}
        <Route index element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/sets/create" element={<Sets />} />
        <Route path="/sets/:setId" element={<ViewSet />} />
      </Route>
    </Routes>
  );
}

export default App; 
