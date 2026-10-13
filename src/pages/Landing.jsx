import React, { useEffect } from "react";
import LandingMain from "../components/LandingMain/LandingMain";
import { titleHandler } from "../actions/actions";
import { motion } from "framer-motion";

function Landing() {
  useEffect(() => {
    titleHandler("Connect & Express");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ minHeight: "100vh", width: "100%" }}
    >
      <LandingMain />
    </motion.div>
  );
}

export default Landing;
