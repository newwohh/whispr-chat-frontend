import React from "react";
import logo from "../../assets/diamond.png";
import { Box, Button, Chip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function LandingNavbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "12px 16px" : "14px 28px",
        borderRadius: "20px",
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Box
        component={RouterLink}
        to="/"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          textDecoration: "none",
        }}
      >
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: "10px",
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.2)",
          }}
        >
          <img
            src={logo}
            alt="Whispr logo"
            style={{ width: "22px", height: "22px", objectFit: "contain" }}
          />
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.03em",
            fontSize: "1.25rem",
          }}
        >
          Whispr
        </Typography>
        <Chip
          label="2.0"
          size="small"
          sx={{
            height: "20px",
            fontSize: "0.7rem",
            fontWeight: 700,
            backgroundColor: "rgba(99, 102, 241, 0.15)",
            color: "#818cf8",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            display: { xs: "none", sm: "inline-flex" },
          }}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
        <Button
          component={RouterLink}
          to="/worldchat"
          startIcon={<PublicIcon sx={{ fontSize: 18 }} />}
          sx={{
            color: "#94a3b8",
            fontSize: "0.875rem",
            display: { xs: "none", md: "inline-flex" },
            "&:hover": { color: "#ffffff", backgroundColor: "rgba(255, 255, 255, 0.05)" },
          }}
        >
          World Chat
        </Button>

        <Button
          component={RouterLink}
          to="/login"
          variant="text"
          sx={{
            color: "#e2e8f0",
            fontSize: "0.875rem",
            fontWeight: 600,
            padding: { xs: "6px 12px", sm: "8px 16px" },
            "&:hover": { color: "#ffffff", backgroundColor: "rgba(255, 255, 255, 0.06)" },
          }}
        >
          Sign In
        </Button>

        <Button
          component={RouterLink}
          to="/signup"
          variant="contained"
          endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
          sx={{
            fontSize: "0.875rem",
            padding: { xs: "6px 14px", sm: "8px 18px" },
            borderRadius: "12px",
            background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
            color: "#ffffff",
            fontWeight: 600,
            boxShadow: "0 4px 15px rgba(99, 102, 241, 0.35)",
            "&:hover": {
              background: "linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)",
              boxShadow: "0 6px 20px rgba(99, 102, 241, 0.5)",
            },
          }}
        >
          {isMobile ? "Join" : "Get Started"}
        </Button>
      </Box>
    </motion.header>
  );
}

export default React.memo(LandingNavbar);
