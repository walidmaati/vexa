import React, { useContext, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import firstpic from "../layout/img/1315512.jpeg";
import secondpic from "../layout/img/1342894.png";
import thirdpic from "../layout/img/1344434.png";
import fourthpic from "../layout/img/1344979.jpeg";
import fifthpic from "../layout/img/1355914.png";
import { motion } from "motion/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <motion.div
      className="hero"
      initial={{ opacity: 0.2, y: 72 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="hero-heading">
        <h1>
          Turn prompt to<span> image</span>, in seconds.
        </h1>
        <div className="animated-text">
          <Typewriter
            words={["Welcome to Vexa", "Enjoy the art"]}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={120}
            deleteSpeed={35}
            delaySpeed={2000}
          />
        </div>
        <button onClick={onClickHandler}>
          {" "}
          <span>
            <i className="fa-solid fa-wand-sparkles"></i> Generate images
          </span>
        </button>
        <div className="styles-gallery">
          <div className="gallery-flex">
            <img src={firstpic} />
          </div>
          <div className="gallery-flex">
            <img src={secondpic} />
          </div>
          <div className="gallery-flex">
            <img src={thirdpic} />
          </div>
          <div className="gallery-flex">
            <img src={fourthpic} />
          </div>
          <div className="gallery-flex">
            <img src={fifthpic} />
          </div>
        </div>
        <span className="hook">
          Generated images from <strong>Vexa</strong>
        </span>
      </div>
    </motion.div>
  );
};

export default Hero;
