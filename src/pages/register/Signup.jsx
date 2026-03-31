import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
  const { login, token } = useAuth();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (token) {
      navigate("/app/content");
    }
  }, [token]);

  const handleSignup = async () => {
    try {
      const res = await axios.post("https://blog-web-backend-5bci.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });
      const data = res.data;

      //after register auto login
      login(data.user, data.token);
    } catch (error) {
      console.log(error);
      if (error.response?.status === 409) {
        toast.error("Email already registered try with another email");
      } else if (error.response?.status === 400) {
        toast.error("All fields are required");
      } else {
        toast.error("Registration failed");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login">
        <h1>Create Account</h1>
        <label htmlFor="username">User Name</label>
        <input
          className="input"
          type="text"
          id="username"
          placeholder="Enter username"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="email">Email</label>
        <input
          className="input"
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="Password">Password</label>
        <input
          className="input"
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button className="btn" type="button" onClick={handleSignup}>
          Create Account
        </button>
        <div>
          <p>
            <input type="checkbox" name="" id="" />I Accept all the terms and
            conditions
          </p>
          <p>
            If you are already have account <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
