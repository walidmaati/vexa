import React from "react";

const GenerateBtn = () => {
  return (
    <div className="generate-section">
      <h1>See the magic, try now!</h1>
      <button className="generate-btn">
        {" "}
        <span>
          <i className="fa-solid fa-wand-sparkles"></i> Generate now
        </span>
      </button>
    </div>
  );
};

export default GenerateBtn;
