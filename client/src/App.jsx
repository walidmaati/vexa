import { Routes, Route } from "react-router-dom";
import Credit from "./pages/Credit";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <div className="container">
        <Navbar />
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
