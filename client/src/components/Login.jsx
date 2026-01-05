import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Login = () => {
  const [state, setState] = useState("Login");
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const { setShowLogin } = useContext(AppContext);

  return (
    <div className="login">
      <motion.form
        initial={{ opacity: 0.2, y: 72 }}
        transition={{ duration: 0.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1>{state}</h1>
        <p style={{ textAlign: "center" }}>
          Welcome back! Please sign to continue
        </p>
        {state !== "Login" && (
          <div className="input-group">
            <i className="fa-solid fa-user"></i>
            <input type="text" placeholder="Fullname" />
          </div>
        )}
        <div className="input-group">
          <i className="fa-solid fa-envelope"></i>
          <input type="text" placeholder="Email" />
        </div>
        <div className="input-group">
          <i className="fa-solid fa-lock"></i>
          <input type="password" placeholder="Password" />
        </div>
        {state == "Login" && <a href="#">Forgot password?</a>}
        <button>{state === "Login" ? "Login" : "Create account"}</button>
        {state === "Login" ? (
          <p onClick={() => setState("Sign up")}>
            Don't have an account? <span>Sign up</span>
          </p>
        ) : (
          <p onClick={() => setState("Login")}>
            Already have an account? <span>Login</span>
          </p>
        )}

        <i
          onClick={() => setShowLogin(false)}
          className="fa-solid fa-close"
        ></i>
      </motion.form>
    </div>
  );
};

export default Login;
