import React from "react";
import LandingMain from "../components/LandingMain/LandingMain";
import { titleHandler } from "../actions/actions";
import { motion } from "framer-motion";

function Landing() {
  titleHandler("Home");
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: 0 }}
      exit={{ x: -200 }}
      transition={{ duration: 1 }}
    >
      <div
        style={{
          height: "100vh",
        }}
      >
        <LandingMain />
      </div>
    </motion.div>
  );
}

export default Landing;
