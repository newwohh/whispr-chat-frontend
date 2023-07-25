import React from "react";
import logo from "../../assets/diamond.png";
import { Button, Typography } from "@mui/material";
import { motion } from "framer-motion";

function LandingNavbar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
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
        <Typography sx={{ color: "white", fontWeight: 600 }}>Whispr</Typography>
      </div>
      <div>
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
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
        </motion.nav>
      </div>
    </div>
  );
}

export default LandingNavbar;
