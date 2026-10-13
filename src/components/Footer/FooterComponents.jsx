import React from "react";
import { Box, Typography, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";

function FooterComponents() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        maxWidth: "1240px",
        marginTop: "auto",
        padding: { xs: "24px 16px", md: "32px 24px" },
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            boxShadow: "0 0 6px #ffffff",
          }}
        />
        <Typography variant="body2" sx={{ color: "#a1a1aa", fontSize: "0.85rem" }}>
          &copy; {new Date().getFullYear()} Whispr. Encrypted &amp; realtime messaging.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 2, sm: 3 } }}>
        <Link
          href="https://github.com/newwohh/whispr-chat-frontend"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            color: "#94a3b8",
            fontSize: "0.85rem",
            textDecoration: "none",
            transition: "color 0.2s ease",
            "&:hover": { color: "#ffffff" },
          }}
        >
          <GitHubIcon sx={{ fontSize: 18 }} />
          GitHub
        </Link>
        <Link
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            color: "#94a3b8",
            fontSize: "0.85rem",
            textDecoration: "none",
            transition: "color 0.2s ease",
            "&:hover": { color: "#ffffff" },
          }}
        >
          <TwitterIcon sx={{ fontSize: 18 }} />
          Twitter
        </Link>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#64748b", fontSize: "0.85rem" }}>
          <ShieldOutlinedIcon sx={{ fontSize: 16 }} />
          <span>Private &amp; Secure</span>
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(FooterComponents);
