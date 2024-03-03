import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3000/auth/login",
      data: {
        email,
        password,
      },
    })
      .then((response) => {
        console.log("cobaRes", response.data);
        setCookie("auth", response.data.accessToken);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log("cobaErr", error);
      });
  };
  return (
    <div className="auth-inner">
      <form onSubmit={doLogin}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
