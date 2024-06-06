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
import MyBlog from "../pages/MyBlog";
import Profile from "../pages/Profile";
import UpdateModal from "../components/blog/UpdateModal";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="profile" element={<Profile />} />
        <Route path="newblog" element={<PrivateRouter />}>
          <Route path="" element={<NewBlog />}></Route>
        </Route>
        <Route path="myblog" element={<PrivateRouter />}>
          <Route path="" element={<MyBlog />} />
        </Route>
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRouter;
