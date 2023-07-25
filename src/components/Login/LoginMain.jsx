import React from "react";
import { Button, Link, TextField, Typography } from "@mui/material";
import useLoginStyles from "../../styles/LoginStyle";
import { motion } from "framer-motion";
import Background from "../Background/Background";
import { useNavigate } from "react-router-dom";

function LoginMain() {
  const [isOpen, setOpen] = React.useState(false);
  const LoginStyleClass = useLoginStyles();
  const navigation = useNavigate(0);
  const navigateTo = () => {
    return navigation("/chat");
  };

  const directTo = () => {
    if (2 - 1 === 1) {
      setOpen(!isOpen);
      setTimeout(navigateTo, 3000);
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
                />
                <TextField
                  label="Password"
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
                  onClick={() => directTo()}
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
        </motion.div>
      </main>
    </>
  );
}

export default LoginMain;
