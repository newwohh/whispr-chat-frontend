import React, { useEffect } from "react";
import { titleHandler } from "../actions/actions";
import LoginMain from "../components/Login/LoginMain";
import { motion } from "framer-motion";

function Login() {
  useEffect(() => {
    titleHandler("Sign In");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ minHeight: "100vh", width: "100%" }}
    >
      <LoginMain />
    </motion.div>
  );
}

export default Login;
