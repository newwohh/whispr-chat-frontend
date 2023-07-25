import React from "react";
import { titleHandler } from "../actions/actions";
import LoginMain from "../components/Login/LoginMain";
import { motion } from "framer-motion";

function Login() {
  titleHandler("Login");
  return (
    <motion.div
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ duration: 1 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <LoginMain />
    </motion.div>
  );
}

export default Login;
