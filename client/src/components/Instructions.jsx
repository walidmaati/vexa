import React from "react";

const Instructions = () => {
  return (
    <div className="instructions">
      <h3>How it works ?</h3>
      <p className="hook">Transform prompts into real images</p>
      <div className="instruction">
        <i className="fa-solid fa-user"></i>
        <div>
          <h4>Describe your vision</h4>
          <p>
            Type a phrase, sentence, or paragraph that describes the image you
            want to create.
          </p>
        </div>
      </div>
      <div className="instruction">
        <i className="fa-solid fa-user"></i>
        <div>
          <h4>Watch the magic</h4>
          <p>
            Our AI-powered engine will transform your text into a high-quality,
            unique image in seconds.
          </p>
        </div>
      </div>
      <div className="instruction">
        <i className="fa-solid fa-user"></i>
        <div>
          <h4>Download & share</h4>
          <p>
            Instantly download your creation or share it with the world directly
            from our platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
