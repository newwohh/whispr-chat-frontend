import React from "react";
import SignUpMain from "../components/SignUp/SignUpMain";
import { titleHandler } from "../actions/actions";
import { motion } from "framer-motion";

function Signup() {
  titleHandler("Signup");

  return (
    <motion.div
      initial={{ x: 300 }}
      animate={{ x: 0 }}
      exit={{ x: -100 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <SignUpMain />
    </motion.div>
  );
}

export default Signup;
