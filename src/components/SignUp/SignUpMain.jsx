import { Button, Divider, TextField, Typography } from "@mui/material";
import React from "react";
import useSignupStyles from "../../styles/SignupStyle";
import Background from "../Background/Background";

function SignUpMain() {
  const [isOpen, setOpen] = React.useState(false);
  const SignUpStyleClass = useSignupStyles();

  return (
    <>
      <div>
        <Background />
        <div className={SignUpStyleClass.signupinputcontainer}>
          <div>
            <Typography variant="h4" gutterBottom>
              Sign Up
            </Typography>
            <TextField
              label="Username"
              id="outlined-size-normal"
              placeholder="Type your username"
              sx={{ width: "350px", marginTop: "30px" }}
            />
            <TextField
              label="E-Mail"
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
            <TextField
              label=" Confirm Password"
              id="outlined-size-normal"
              placeholder="Type your password"
              sx={{ width: "350px", marginTop: "30px" }}
            />
          </div>
          <div>
            <Button
              sx={{
                marginTop: "20px",
                marginBottom: "20px",
                width: "160px",
                height: "40px",
                borderRadius: "20px",
                color: "white",
                backgroundImage:
                  "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);",
              }}
              onClick={() => setOpen(!isOpen)}
            >
              Submit
            </Button>
          </div>
          <Divider />
          <div>Google Auth</div>
        </div>
      </div>
    </>
  );
}

export default SignUpMain;
