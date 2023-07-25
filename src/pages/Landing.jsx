import React from "react";
import LandingMain from "../components/LandingMain/LandingMain";
import { titleHandler } from "../actions/actions";
import Background from "../components/Background/Background";

function Landing() {
  titleHandler("Home");
  return (
    <React.Fragment>
      <Background />
      <div
        style={{
          height: "100vh",
          backgroundImage: "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)",
        }}
      >
        <LandingMain />
      </div>
    </React.Fragment>
  );
}

export default Landing;
