import React from "react";
import SignUpMain from "../components/SignUp/SignUpMain";
import { titleHandler } from "../actions/actions";

function Signup() {
  titleHandler("Signup");

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
        height: "100vh",
        backgroundImage: "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)",
      }}
    >
      <SignUpMain />
    </main>
  );
}

export default Signup;
