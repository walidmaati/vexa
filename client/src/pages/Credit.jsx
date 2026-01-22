import React, { useContext, useEffect } from "react";
import logo from "../layout/img/transparent_logo.png";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Credit = () => {
  const plans = [
    {
      id: "Basic",
      price: 10,
      credits: 100,
      description: "Personal use",
    },
    {
      id: "Advanced",
      price: 50,
      credits: 500,
      description: "Professional use",
    },
    {
      id: "Business",
      price: 250,
      credits: 1000,
      description: "Business use",
    },
  ];

  const { user, loadCreditsData, token, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const initPay = async (order) => {
    const options = {
      key: "rzp_test_us_S0k370bDdVhm2E",
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            "http://localhost:3001/api/user/verify-razor",
            response,
            { headers: token }
          );
          if (data.success) {
            loadCreditsData();
            navigate("/");
            toast.success("Credit added successfully");
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
      }
      const { data } = await axios.post(
        "http://localhost:3001/api/user/pay-razor",
        { planId },
        {
          headers: { token },
        }
      );
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
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
              <button
                onClick={() => {
                  paymentRazorpay(plan.id);
                }}
              >
                {user ? "Purchase" : "Get started"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Credit;
