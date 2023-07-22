import React from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";

function LoginMain() {
  return (
    <>
      <main
        style={{
          textAlign: "center",
        }}
      >
        <div>
          <div>
            <Box
              sx={{
                padding: "50px",
                width: "500px",
                height: "400px",
                backgroundColor: "white",
                borderRadius: "40px",
              }}
            >
              <Typography
                variant="h3"
                sx={{ fontFamily: "Courier New" }}
                gutterBottom
              >
                Welcome back!
              </Typography>

              <div>
                <Typography variant="h4" gutterBottom>
                  Sign In
                </Typography>
                <TextField
                  label="Username or E-Mail"
                  id="outlined-size-normal"
                  placeholder="Type your username"
                  sx={{ width: "350px", marginTop: "30px" }}
                />
                <TextField
                  label="Password"
                  id="outlined-size-normal"
                  placeholder="Type your password"
                  sx={{ width: "350px", marginTop: "30px" }}
                />
              </div>
              <Button
                sx={{
                  marginTop: "20px",
                  width: "150px",
                  height: "40px",
                  borderRadius: "20px",
                  color: "white",
                  backgroundImage:
                    "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);",
                }}
              >
                Submit
              </Button>
            </Box>
          </div>
        </div>
      </main>
    </>
  );
}

export default LoginMain;
