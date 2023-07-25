import React from "react";
import LandingMain from "../components/LandingMain/LandingMain";
import { titleHandler } from "../actions/actions";
import Background from "../components/Background/Background";

function Landing() {
  titleHandler("Home");
  return (
    <React.Fragment>
      <Background />
      <div></div>
      <LandingMain />
    </React.Fragment>
  );
}

export default Landing;
