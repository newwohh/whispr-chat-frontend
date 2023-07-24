import React from "react";
import { Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import LandingNavbar from "./LandingNavbar";

function LandingMain() {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            border: "1px solid transparent",
            borderRadius: "15px",
            marginTop: "20px",
            width: "1450px",
            height: "900px",
          }}
        >
          <div>
            <LandingNavbar />
          </div>
          <div>
            <motion.div
              initial={{ x: -200 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                width: "500px",
                marginTop: "40px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "Helvetica",
                  color: "white",
                  fontWeight: 1000,
                }}
              >
                Connect and communicate seamlessly with friends and loved ones
                through our secure and intuitive chat application{" "}
              </Typography>
              <motion.div transition={{ duration: 1.5 }}>
                <Button
                  href="/signup"
                  sx={{
                    "&:hover": {
                      border: "2px solid white",
                    },
                    fontWeight: 1000,
                    marginTop: "20px",
                    marginBottom: "20px",
                    width: "250px",
                    height: "60px",
                    borderRadius: "20px",
                    color: "white",
                    backgroundColor: "#60dfcd",
                    backgroundImage:
                      "linear-gradient(315deg, #60dfcd 0%, #1e9afe 74%)",
                  }}
                >
                  Sign Up
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <div style={{ width: "500px" }}></div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LandingMain;
