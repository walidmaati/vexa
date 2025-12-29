import React, { useContext, useState } from "react";
import logo from "../layout/img/transparent_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [isToggeled, setIsToggeled] = useState(false);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="nav-heading">
        <Link to="/">
          <img src={logo} />
          <p>Vexa</p>
        </Link>
      </div>
      <div className="nav-control">
        {user ? (
          <div className="logged-in">
            <p>
              <i className="fa-regular fa-star"></i> Credentials : 0
            </p>
            <div className="profile-control">
              <span>Hello, Vexa</span>
              <div>
                <img onClick={() => setIsToggeled(!isToggeled)} src={logo} />
                <button className={`${isToggeled ? "hovered-btn" : ""}`}>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="logged-out">
            <p onClick={() => navigate("/buy")}>$ Pricing</p>
            <button>Log In</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
