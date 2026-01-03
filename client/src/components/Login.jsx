import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

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
      <form>
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
        <a href="#">Forgot password?</a>
        <br />
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
      </form>
    </div>
  );
};

export default Login;
