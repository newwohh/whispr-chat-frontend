import { Link } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";

function FooterComponents() {
  return (
    <div style={{ display: "flex" }}>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
        style={{ display: "flex" }}
      >
        <p>&copy; hellonevo13@gmail.com</p>
      </motion.div>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
        style={{ display: "flex" }}
      >
        <Link
          href="instagram.com"
          sx={{ marginLeft: "10px", color: "white", textDecoration: "none" }}
        >
          Instagram
        </Link>
        <Link
          href="twitter.com"
          sx={{ marginLeft: "10px", color: "white", textDecoration: "none" }}
        >
          Twitter
        </Link>
        <Link
          href="https://github.com/newwohh"
          sx={{ marginLeft: "10px", color: "white", textDecoration: "none" }}
        >
          Github
        </Link>
      </motion.div>
    </div>
  );
}

export default FooterComponents;
