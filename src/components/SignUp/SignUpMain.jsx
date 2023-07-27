import { Button, Divider, TextField, Typography } from "@mui/material";
import React from "react";
import useSignupStyles from "../../styles/SignupStyle";
import Background from "../Background/Background";
import { motion } from "framer-motion";
import { backendBaseUrl } from "../../constants/constants";
import { useNavigate } from "react-router-dom";

function SignUpMain() {
  const SignUpStyleClass = useSignupStyles();
  const navigation = useNavigate(0);
  let signupCredentials = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  let user;
  console.log(signupCredentials.email);
  const signupHandler = async (name, email, password, passwordConfirm) => {
    try {
      const request = await fetch(backendBaseUrl + "/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          password2: passwordConfirm,
          tc: "True",
        }),
        credentials: "include",
      });
      const response = await request.json();
      user = response;
      if (user.message === "success") {
        navigation("/login");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <Background />
        <div className={SignUpStyleClass.signupinputcontainer}>
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Typography variant="h4" gutterBottom>
              Sign Up
            </Typography>
            <TextField
              label="Username"
              id="outlined-size-normal"
              placeholder="Type your username"
              sx={{ width: "350px", marginTop: "30px" }}
              onChange={(e) => (signupCredentials.name = e.target.value)}
            />
            <TextField
              label="E-Mail"
              id="outlined-size-normal"
              placeholder="Type your username"
              sx={{ width: "350px", marginTop: "30px" }}
              onChange={(e) => (signupCredentials.email = e.target.value)}
            />
            <TextField
              label="Password"
              id="outlined-size-normal"
              placeholder="Type your password"
              sx={{ width: "350px", marginTop: "30px" }}
              onChange={(e) => (signupCredentials.password = e.target.value)}
            />
            <TextField
              label=" Confirm Password"
              id="outlined-size-normal"
              placeholder="Type your password"
              sx={{ width: "350px", marginTop: "30px" }}
              onChange={(e) =>
                (signupCredentials.passwordConfirm = e.target.value)
              }
            />
          </motion.div>
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
              onClick={() =>
                signupHandler(
                  signupCredentials.name,
                  signupCredentials.email,
                  signupCredentials.password,
                  signupCredentials.passwordConfirm
                )
              }
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
