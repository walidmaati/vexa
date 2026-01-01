import React from "react";
import Hero from "../components/Hero";
import Instructions from "../components/Instructions";
import GenerateBtn from "../components/GenerateBtn";

const Home = () => {
  return (
    <div>
      <Hero />
      <Instructions />
      <GenerateBtn />
    </div>
  );
};

export default Home;
