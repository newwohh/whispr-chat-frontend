import React from "react";
import { Button, Chip, Typography } from "@mui/material";
import { motion } from "framer-motion";
import LandingNavbar from "./LandingNavbar";
import FooterComponents from "../Footer/FooterComponents";
import chatpeoplelanding from "../../assets/hero-landing-1.jpg";
import Background from "../Background/Background";

function LandingMain() {
  return (
    <React.Fragment>
      <Background />

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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
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
                  fontWeight: 800,
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
            <motion.div
              style={{
                width: "500px",
                marginTop: "40px",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                style={{
                  marginTop: "550px",
                  position: "absolute",
                  marginLeft: "10px",
                }}
              >
                <Chip
                  label="Connect with friends."
                  sx={{ backgroundColor: "white" }}
                />
              </motion.div>
              <img
                src={chatpeoplelanding}
                alt="hero"
                style={{
                  borderRadius: "30px",
                  height: "600px",
                  width: "400px",
                  marginRight: "-50px",
                }}
              />
              <motion.div
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                style={{
                  position: "absolute",
                  marginLeft: "250px",
                  marginTop: "10px",
                }}
              >
                <Chip
                  label="Connect with family"
                  sx={{ backgroundColor: "white" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
        <FooterComponents />
      </div>
    </React.Fragment>
  );
}

export default LandingMain;
