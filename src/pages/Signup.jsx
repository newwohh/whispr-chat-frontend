import React, { useEffect } from "react";
import SignUpMain from "../components/SignUp/SignUpMain";
import { titleHandler } from "../actions/actions";
import { motion } from "framer-motion";

function Signup() {
  useEffect(() => {
    titleHandler("Create Account");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ minHeight: "100vh", width: "100%" }}
    >
      <SignUpMain />
    </motion.div>
  );
}

export default Signup;
