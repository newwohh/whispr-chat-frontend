import React from "react";
import LandingMain from "../components/LandingMain/LandingMain";
import { titleHandler } from "../actions/actions";

function Landing() {
  titleHandler("Home");
  return (
    <React.Fragment>
      <LandingMain />
    </React.Fragment>
  );
}

export default Landing;
