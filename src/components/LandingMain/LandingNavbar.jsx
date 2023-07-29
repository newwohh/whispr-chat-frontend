import React from "react";
import logo from "../../assets/diamond.png";
import { Button, Typography } from "@mui/material";
import { motion } from "framer-motion";

function LandingNavbar() {
  console.log(process.env);
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          style={{
            width: "35px",
            height: "35px",
            marginTop: "20px",
            marginBottom: "30px",
            marginLeft: "10px",
            marginRight: "6px",
          }}
          alt="logo"
        />
        <Typography
          sx={{
            color: "white",
            fontWeight: 600,
            "&:hover": { cursor: "default" },
          }}
        >
          Whispr
        </Typography>
      </div>
      <div>
        <nav>
          <Button
            href="/login"
            variant="outlined"
            sx={{
              "&:hover": {
                borderColor: "white",
              },
              color: "white",
              borderColor: "white",
              borderRadius: "15px",
              width: "100px",
            }}
          >
            Sign in
          </Button>
          <Button
            variant="outlined"
            sx={{
              "&:hover": {
                borderColor: "white",
              },
              color: "white",
              marginLeft: "30px",
              borderColor: "white",
              borderRadius: "15px",
              width: "100px",
            }}
          >
            About
          </Button>
        </nav>
      </div>
    </motion.div>
  );
}

export default LandingNavbar;
