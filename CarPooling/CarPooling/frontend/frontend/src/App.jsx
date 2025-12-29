import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostRide from "./pages/PostRide";
import SearchRide from "./pages/SearchRide";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post-ride" element={<PostRide />} />
        <Route path="/search" element={<SearchRide />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


