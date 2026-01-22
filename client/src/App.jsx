import { Routes, Route } from "react-router-dom";
import Credit from "./pages/Credit";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { showLogin } = useContext(AppContext);
  return (
    <>
      <div className="container">
        <ToastContainer position="bottom-right" />
        <Navbar />
        {showLogin && <Login />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/buy" element={<Credit />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
