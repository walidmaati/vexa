import React, { useContext } from "react";
import logo from "../layout/img/transparent_logo.png";
import { AppContext } from "../context/AppContext";

const Credit = () => {
  const plans = [
    {
      id: "Basic",
      price: 2.99,
      credits: 100,
      description: "Better for a personal use",
    },
    {
      id: "Advanced",
      price: 4.99,
      credits: 500,
      description: "Better for professional use",
    },
    {
      id: "Basic",
      price: 9.99,
      credits: 1000,
      description: "Better for business use",
    },
  ];

  const { user } = useContext(AppContext);

  return (
    <div className="credits-container">
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
    </div>
  );
};

export default Credit;
