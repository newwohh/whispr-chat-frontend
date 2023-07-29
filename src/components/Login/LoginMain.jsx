import React from "react";
import { Button, Divider, Link, TextField, Typography } from "@mui/material";
import useLoginStyles from "../../styles/LoginStyle";
import { motion } from "framer-motion";
import Background from "../Background/Background";
import { useNavigate } from "react-router-dom";
import { backendBaseUrl } from "../../constants/constants";
import { setUserLocally } from "../../handlers/setLocalStorage";
import {
  GoogleOAuthProvider,
  googleLogout,
  GoogleLogin,
} from "@react-oauth/google";
import jwt_decode from "jwt-decode";

function LoginMain() {
  const [isOpen, setOpen] = React.useState(false);
  const LoginStyleClass = useLoginStyles();
  const navigation = useNavigate(0);
  let credentials = { email: "", password: "" };
  const navigateTo = () => {
    return navigation("/chat");
  };
  let user;

  const loginHandler = async (email, password) => {
    try {
      const request = await fetch(backendBaseUrl + "/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: "include",
      });
      const response = await request.json();
      user = response;
      setUserLocally(user);
      if (user.msg === "login success") {
        setOpen(!isOpen);
        setTimeout(navigateTo, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main
        style={{
          textAlign: "center",
        }}
      >
        <Background />
        <motion.div
          className={LoginStyleClass.logininputcontainer}
          layout
          style={{
            width: isOpen ? "1400px" : "500px",
            textAlign: "center",
            height: isOpen ? "700px" : "450x",
          }}
          transition={{ type: "keyframes", duration: 1.5 }}
        >
          {isOpen ? (
            ""
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
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
                  onChange={(e) => (credentials.email = e.target.value)}
                />
                <TextField
                  label="Password"
                  id="outlined-size-normal"
                  placeholder="Type your password"
                  type="password"
                  sx={{ width: "350px", marginTop: "30px" }}
                  onChange={(e) => (credentials.password = e.target.value)}
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
                  onClick={() =>
                    loginHandler(credentials.email, credentials.password)
                  }
                >
                  Submit
                </Button>
              </div>
              <div style={{ zIndex: 1 }}>
                <Link underline="hover" href="/signup" style={{ zIndex: 1 }}>
                  Not a member? Click here to SignUp
                </Link>
              </div>
            </motion.div>
          )}
          <Divider sx={{ marginTop: "10px" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <GoogleOAuthProvider
              clientId={`${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}`}
            >
              <GoogleLogin
                size="10px"
                onSuccess={(credentialResponse) => {
                  var decoded = jwt_decode(credentialResponse.credential);
                  console.log(decoded);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              <div>{/* <button onClick={logOut}>log</button> */}</div>
            </GoogleOAuthProvider>
          </div>
        </motion.div>
      </main>
    </>
  );
}

export default LoginMain;
