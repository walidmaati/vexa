import React, { useContext, useState } from "react";
import logo from "../layout/img/transparent_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import avatar from "../layout/img/avatar.png";

const Navbar = () => {
  const [isToggeled, setIsToggeled] = useState(false);
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
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
            <p onClick={() => navigate("/buy")}>
              <i className="fa-regular fa-star"></i> Credentials : {credit}
            </p>
            <div className="profile-control">
              <span>Hello, {user.name}</span>
              <div>
                <img onClick={() => setIsToggeled(!isToggeled)} src={avatar} />
                <button
                  onClick={logout}
                  className={`${isToggeled ? "hovered-btn" : ""}`}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="logged-out">
            <p onClick={() => navigate("/buy")}>$ Pricing</p>
            <button onClick={() => setShowLogin(true)}>Log In</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
