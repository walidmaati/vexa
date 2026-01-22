import React, { useContext, useState } from "react";
import image_test from "../layout/img/1315512.jpeg";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = useState(image_test);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const { generateImage } = useContext(AppContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (input) {
      const image = await generateImage(input);
      if (image) {
        setIsImageLoaded(true);
        setImage(image);
      }
    }
    setLoading(false);
  };
  return (
    <div className="result-container">
      <form onSubmit={onSubmitHandler} className="result">
        <div className="loading-image">
          <img src={image} />
          <span className={`${loading ? "w-full" : "w-0"}`} />
          {isImageLoaded && (
            <a href={image} download>
              <i className="fa-solid fa-download"></i>
            </a>
          )}
        </div>
        {!isImageLoaded && (
          <div className="prompt-area">
            <textarea
              onChange={(e) => setInput(e.target.value)}
              value={input}
              placeholder="Type your prompt here to generate"
            />
            <button>Generate</button>
          </div>
        )}
        {isImageLoaded && (
          <button
            onClick={() => setIsImageLoaded(false)}
            className="generate-another generate-btn"
          >
            {" "}
            <span>
              <i className="fa-solid fa-wand-sparkles"></i> Generate another
            </span>
          </button>
        )}
      </form>
    </div>
  );
};

export default Result;
