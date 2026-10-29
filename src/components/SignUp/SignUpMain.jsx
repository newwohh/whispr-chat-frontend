import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import Background from "../Background/Background";
import { motion } from "framer-motion";
import { backendBaseUrl } from "../../constants/constants";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import logo from "../../assets/diamond.png";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

function SignUpMain() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const signupHandler = async (e) => {
    if (e) e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMsg("Passwords do not match. Please verify your confirmation password.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    try {
      const request = await fetch(backendBaseUrl + "/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password,
          password2: passwordConfirm,
          tc: "True",
        }),
        credentials: "include",
      });

      const response = await request.json();

      if (response && (response.message === "success" || response.msg === "success" || response.status === "success")) {
        navigate("/login", { state: location.state });
      } else {
        const errorDetail =
          typeof response?.errors === "object"
            ? Object.values(response.errors).flat().join(" ")
            : response?.message || response?.msg || "Registration failed. Please try a different email.";
        setErrorMsg(errorDetail);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setErrorMsg("Unable to reach server. Please check your connection or try again later.");
    } finally {
      setLoading(false);
    }
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
        style={{ width: "100%", maxWidth: "460px" }}
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
              Create an account
            </Typography>
            <Typography variant="body2" sx={{ color: "#a1a1aa" }}>
              Join Whispr for encrypted, instantaneous messaging
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

          <Box component="form" onSubmit={signupHandler} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Username"
              placeholder="alex_dev"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineRoundedIcon sx={{ color: "#71717a", fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Email Address"
              placeholder="alex@example.com"
              type="email"
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

            <TextField
              fullWidth
              label="Confirm Password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "#71717a", fontSize: 20 }} />
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
              {loading ? <CircularProgress size={22} sx={{ color: "#000000" }} /> : "Create Account"}
            </Button>
          </Box>

          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Typography variant="body2" sx={{ color: "#a1a1aa", fontSize: "0.875rem" }}>
              Already have an account?{" "}
              <Box
                component={RouterLink}
                to="/login"
                sx={{
                  color: "#ffffff",
                  textDecoration: "underline",
                  fontWeight: 600,
                  "&:hover": { color: "#e4e4e7" },
                }}
              >
                Sign in
              </Box>
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}

export default SignUpMain;
