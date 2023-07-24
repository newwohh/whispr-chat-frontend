import React from "react";
import { Button, Typography } from "@mui/material";
import { motion } from "framer-motion";

function LandingMain() {
  return (
    <main>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <motion.div
          animate={{ x: 100 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderRadius: "15px",
            marginTop: "100px",
            border: "1px solid transparent",
            width: "1450px",
            height: "900px",
          }}
        >
          <div
            style={{
              width: "500px",
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h2"
              sx={{ fontFamily: "Helvetica", color: "white", fontWeight: 1000 }}
            >
              Connect and communicate seamlessly with friends and loved ones
              through our secure and intuitive chat application{" "}
            </Typography>
            <motion.div transition={{ duration: 1.5 }}>
              <Button
                href="/signup"
                sx={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  width: "250px",
                  height: "60px",
                  borderRadius: "20px",
                  color: "white",
                  backgroundImage:
                    "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);",
                }}
              >
                Sign Up
              </Button>
            </motion.div>
          </div>
          <div style={{ width: "500px" }}></div>
        </motion.div>
      </div>
    </main>
  );
}

export default LandingMain;
