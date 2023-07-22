import React from "react";
import { titleHandler } from "../actions/actions";
import LoginMain from "../components/Login/LoginMain";

function Login() {
  titleHandler("Login");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
        height: "100vh",
        backgroundImage: "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)",
      }}
    >
      <LoginMain />
    </div>
  );
}

export default Login;
