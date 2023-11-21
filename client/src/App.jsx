import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.scss";
import Home from "./routes/Home";
import Category from "./routes/Category";
import CreateSet from "./routes/CreateSet";
import EditSet from "./routes/EditSet";
import ViewSet from "./routes/ViewSet";
import Search from "./routes/Search";
import Profile from "./routes/Profile";
import Register from "./routes/Register";
import Login from "./routes/Login";


function App() {


  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Add routes here */}
        <Route index element={<Home />} />
        <Route path="/sets/create" element={<CreateSet />} />
        <Route path="/sets/edit/:setId" element={<EditSet />} />
        <Route path="/categories/:categoryId" element={<Category />} />
        <Route path="/sets/:setId" element={<ViewSet />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Route>
    </Routes>
  );
}

export default App; 
