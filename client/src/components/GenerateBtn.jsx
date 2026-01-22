import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };
  return (
    <div className="generate-section">
      <h1>See the magic, try now!</h1>
      <button onClick={onClickHandler} className="generate-btn">
        {" "}
        <span>
          <i className="fa-solid fa-wand-sparkles"></i> Generate now
        </span>
      </button>
    </div>
  );
};

export default GenerateBtn;
