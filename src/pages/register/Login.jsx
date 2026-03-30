import "../register.css";
// import logo from "../assets/logo.png";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { useEffectEvent } from "react";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { login, token } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/app/content");
    }
  }, [token]);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://blog-1-d8f0.onrender.com/api/auth/login",
        {
          email,
          password,
        },
      );

      const data = res.data;

      // save in context
      login(data.user, data.token);

      // navigate AFTER login
      // navigate("/app/content");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Invalid credentials");
    }
  };

  return (
    <section className="login-bg">
      <div className="login">
        <h1>Login</h1>

        <input
          className="input"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" type="button" onClick={handleLogin}>
          Login
        </button>

        <p>
          If you are a new user <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </section>
  );
}
