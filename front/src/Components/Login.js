import React, { useState } from "react";
import "../css/newSignup.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Spinner } from "react-bootstrap";

function Login() {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");
  const history = useHistory();

  function login() {
    setLoading(true);
    const payload = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    axios.post("http://localhost:5000/login", payload)
      .then((response) => {
        if (response.data.user) {
          localStorage.setItem("token", response.data.jwt_token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          history.push({ pathname: "/feed", user: response.data.user });
        } else {
          setInfo(response.data);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error occurred", error);
      });
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <form className="Box-1 login">
          <h1>Log in</h1>
          <p style={{ color: "white" }}>{info}</p>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
          />
          <button type="button" className="submit" onClick={login}>
            {loading ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                <span className="sr-only">Loading...</span>
              </>
            ) : (
              <>Submit</>
            )}
          </button>
          <p style={{ color: "white" }}>
            Don't have an account?{" "}
            <a href="/sign-up" style={{ color: "black" }}>Click here</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
