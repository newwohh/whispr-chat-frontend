import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import Background from "../Background/Background";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import { backendBaseUrl } from "../../constants/constants";
import { setUserLocally } from "../../handlers/setLocalStorage";
import { ChatsContext } from "../../context/ChatContext";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import logo from "../../assets/diamond.png";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

function LoginMain() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(ChatsContext);

  const redirectTarget = location.state?.from?.pathname || "/chat";

  const loginHandler = async (e) => {
    if (e) e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    try {
      const request = await fetch(backendBaseUrl + "/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
        credentials: "include",
      });

      const response = await request.json();

      if (response && (response.msg === "login success" || response.message === "success" || response.token)) {
        setUserLocally(response);
        if (setUser) setUser(response);
        navigate(redirectTarget, { replace: true });
      } else {
        setErrorMsg(response?.msg || response?.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login request failed:", error);
      setErrorMsg("Unable to reach authentication server. Please check your network or try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const demoUser = {
      user: {
        name: "DemoUser",
        id: "demo-user-1",
        email: email || "demo@whispr.io",
      },
      users: [
        { name: "Sarah Connor", id: "101" },
        { name: "Alex Rivera", id: "102" },
        { name: "Elena Rostova", id: "103" },
        { name: "Marcus Vance", id: "104" },
      ],
    };
    setUserLocally(demoUser);
    if (setUser) setUser(demoUser);
    navigate(redirectTarget, { replace: true });
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: 2, sm: 3 },
        position: "relative",
        backgroundColor: "#000000",
      }}
    >
      <Background />

      <Box
        component={RouterLink}
        to="/"
        sx={{
          position: "absolute",
          top: { xs: 16, sm: 28 },
          left: { xs: 16, sm: 28 },
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "#a1a1aa",
          textDecoration: "none",
          fontSize: "0.9rem",
          fontWeight: 600,
          padding: "8px 14px",
          borderRadius: "8px",
          background: "#0e0e11",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          transition: "all 0.15s ease",
          "&:hover": { color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.3)" },
        }}
      >
        <ArrowBackRoundedIcon sx={{ fontSize: 18 }} />
        <span>Back to Home</span>
      </Box>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: "440px" }}
      >
        <Box
          sx={{
            width: "100%",
            borderRadius: "16px",
            background: "#0e0e11",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            padding: { xs: "28px 22px", sm: "36px 32px" },
          }}
        >
          {/* Logo & Header */}
          <Box sx={{ textAlign: "center", mb: 3.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1.5,
              }}
            >
              <img
                src={logo}
                alt="Whispr logo"
                style={{ width: "22px", height: "22px", objectFit: "contain", filter: "brightness(0) invert(1)" }}
              />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#ffffff", mb: 0.5 }}>
              Welcome back
            </Typography>
            <Typography variant="body2" sx={{ color: "#a1a1aa" }}>
              Sign in to continue to your Whispr messages
            </Typography>
          </Box>

          {errorMsg && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                fontSize: "0.85rem",
              }}
            >
              {errorMsg}
            </Alert>
          )}

          <Box component="form" onSubmit={loginHandler} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Email or Username"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ color: "#71717a", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "#71717a", fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                      sx={{ color: "#71717a" }}
                    >
                      {showPassword ? <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }} /> : <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 1,
                py: 1.3,
                borderRadius: "8px",
                fontSize: "0.95rem",
                fontWeight: 700,
                backgroundColor: "#ffffff",
                color: "#000000",
                "&:hover": {
                  backgroundColor: "#e4e4e7",
                },
              }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: "#000000" }} /> : "Sign In"}
            </Button>
          </Box>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button
              variant="text"
              size="small"
              onClick={handleDemoLogin}
              sx={{
                color: "#a1a1aa",
                fontSize: "0.8rem",
                textTransform: "none",
                "&:hover": { color: "#ffffff", backgroundColor: "rgba(255, 255, 255, 0.06)" },
              }}
            >
              Or explore as Guest / Demo
            </Button>
          </Box>

          <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.1)" }}>
            <Typography variant="caption" sx={{ color: "#71717a", px: 1 }}>
              or continue with
            </Typography>
          </Divider>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || "demo"}`}>
              <GoogleLogin
                theme="filled_black"
                shape="pill"
                onSuccess={(credentialResponse) => {
                  try {
                    const decoded = jwt_decode(credentialResponse.credential);
                    const googleUser = {
                      user: {
                        name: decoded.name || "Google User",
                        id: decoded.sub || "google-id",
                        email: decoded.email,
                      },
                      users: [
                        { name: "Sarah Connor", id: "101" },
                        { name: "Alex Rivera", id: "102" },
                        { name: "Elena Rostova", id: "103" },
                      ],
                    };
                    setUserLocally(googleUser);
                    if (setUser) setUser(googleUser);
                    navigate(redirectTarget, { replace: true });
                  } catch (e) {
                    console.error("Google token decode failed:", e);
                  }
                }}
                onError={() => {
                  setErrorMsg("Google sign-in was unsuccessful.");
                }}
              />
            </GoogleOAuthProvider>
          </Box>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="body2" sx={{ color: "#a1a1aa", fontSize: "0.875rem" }}>
              Don&apos;t have an account?{" "}
              <Box
                component={RouterLink}
                to="/signup"
                sx={{
                  color: "#ffffff",
                  textDecoration: "underline",
                  fontWeight: 600,
                  "&:hover": { color: "#e4e4e7" },
                }}
              >
                Sign up
              </Box>
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}

export default LoginMain;
