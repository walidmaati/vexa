import React, { useContext, useEffect } from "react";
import logo from "../layout/img/transparent_logo.png";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Credit = () => {
  const plans = [
    {
      id: "Basic",
      price: 2.99,
      credits: 100,
      description: "Personal use",
    },
    {
      id: "Advanced",
      price: 4.99,
      credits: 500,
      description: "Professional use",
    },
    {
      id: "Business",
      price: 9.99,
      credits: 1000,
      description: "Business use",
    },
  ];

  const { user } = useContext(AppContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      className="credits-container"
      initial={{ opacity: 0.2, y: 72 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="credits">
        <span>Our Plans</span>
        <h1>Choose the plan</h1>
        <div className="plans">
          {plans.map((plan, index) => (
            <div className="plan" key={index}>
              <img src={logo} />
              <h3>{plan.id}</h3>
              <p>{plan.description}</p>
              <span>
                ${plan.price} : <strong>{plan.credits} credit</strong>
              </span>
              <button>{user ? "Purchase" : "Get started"}</button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Credit;
