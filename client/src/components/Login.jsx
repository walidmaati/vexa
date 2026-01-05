import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setShowLogin, backendURL, setToken, setUser } =
    useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        const { data } = await axios.post(`${backendURL}/api/user/login`, {
          email,
          password,
        });
        if (data.success == true) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendURL}/api/user/register`, {
          name,
          email,
          password,
        });
        if (data.success == true) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="login">
      <motion.form
        onSubmit={onSubmitHandler}
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
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Fullname"
              required
            />
          </div>
        )}
        <div className="input-group">
          <i className="fa-solid fa-envelope"></i>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Email"
            required
          />
        </div>
        <div className="input-group">
          <i className="fa-solid fa-lock"></i>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
          />
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
