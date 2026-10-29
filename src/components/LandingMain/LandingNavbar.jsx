import React, { useContext } from "react";
import logo from "../../assets/diamond.png";
import { Box, Button, Chip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ChatsContext } from "../../context/ChatContext";
import { isUserAuthenticated } from "../../routes/ProtectedRoute";

function LandingNavbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useContext(ChatsContext);
  const authenticated = isUserAuthenticated(user);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "12px 16px" : "14px 28px",
        borderRadius: "14px",
        background: "rgba(14, 14, 17, 0.8)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
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
            borderRadius: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="Whispr logo"
            style={{ width: "20px", height: "20px", objectFit: "contain", filter: "brightness(0) invert(1)" }}
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
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.2)",
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
            color: "#a1a1aa",
            fontSize: "0.875rem",
            display: { xs: "none", md: "inline-flex" },
            "&:hover": { color: "#ffffff", backgroundColor: "rgba(255, 255, 255, 0.08)" },
          }}
        >
          World Chat
        </Button>

        {authenticated ? (
          <Button
            component={RouterLink}
            to="/chat"
            variant="contained"
            endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
            sx={{
              fontSize: "0.875rem",
              padding: { xs: "6px 14px", sm: "8px 18px" },
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              color: "#000000",
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "#e4e4e7",
              },
            }}
          >
            Open Web App
          </Button>
        ) : (
          <>
            <Button
              component={RouterLink}
              to="/login"
              variant="text"
              sx={{
                color: "#e4e4e7",
                fontSize: "0.875rem",
                fontWeight: 600,
                padding: { xs: "6px 12px", sm: "8px 16px" },
                "&:hover": { color: "#ffffff", backgroundColor: "rgba(255, 255, 255, 0.08)" },
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
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                color: "#000000",
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "#e4e4e7",
                },
              }}
            >
              {isMobile ? "Join" : "Get Started"}
            </Button>
          </>
        )}
      </Box>
    </motion.header>
  );
}

export default React.memo(LandingNavbar);
