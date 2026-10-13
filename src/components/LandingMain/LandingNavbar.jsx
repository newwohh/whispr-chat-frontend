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
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "12px 16px" : "14px 28px",
        borderRadius: "16px",
        background: "rgba(19, 25, 38, 0.75)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
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
            width: 36,
            height: 36,
            borderRadius: "10px",
            backgroundColor: "rgba(79, 70, 229, 0.15)",
            border: "1px solid rgba(79, 70, 229, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="Whispr logo"
            style={{ width: "20px", height: "20px", objectFit: "contain" }}
          />
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            color: "#ffffff",
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
            backgroundColor: "rgba(79, 70, 229, 0.15)",
            color: "#818cf8",
            border: "1px solid rgba(79, 70, 229, 0.3)",
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
            borderRadius: "10px",
            backgroundColor: "#4f46e5",
            color: "#ffffff",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#4338ca",
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
