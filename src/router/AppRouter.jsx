import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Footer from "../components/Footer";
import About from "../pages/About";
import NewBlog from "../pages/NewBlog";
import Detail from "../pages/Detail";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="newblog" element={<NewBlog />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="blog" element={<PrivateRouter />}>
          <Route path="" element={<Dashboard />}></Route>
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
