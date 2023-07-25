import React from "react";
import SignUpMain from "../components/SignUp/SignUpMain";
import { titleHandler } from "../actions/actions";
import { motion } from "framer-motion";

function Signup() {
  titleHandler("Signup");

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: -window.innerWidth }}
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
    </motion.div>
  );
}

export default Signup;
