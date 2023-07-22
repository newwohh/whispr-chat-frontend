import React from "react";
import { Button, Link, TextField, Typography } from "@mui/material";
import useLoginStyles from "../../styles/LoginStyle";

function LoginMain() {
  const LoginStyleClass = useLoginStyles();

  return (
    <>
      <main
        style={{
          textAlign: "center",
        }}
      >
        <div>
          <div className={LoginStyleClass.logininputcontainer}>
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
            <div>
              <Button className={LoginStyleClass.btnlogin}>Submit</Button>
            </div>
            <div>
              <Link href="/signup">Not a member? Click here to SignUp</Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default LoginMain;
