import React from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  Typography,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";
import LandingNavbar from "./LandingNavbar";
import FooterComponents from "../Footer/FooterComponents";
import Background from "../Background/Background";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";

function LandingMain() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: { xs: "12px 16px", sm: "20px 24px", md: "24px 32px" },
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <Background />

      <Box
        sx={{
          width: "100%",
          maxWidth: "1240px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <LandingNavbar />

        {/* Hero Section */}
        <Box
          sx={{
            py: { xs: 6, sm: 8, md: 10 },
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid container spacing={{ xs: 5, md: 6 }} alignItems="center">
            {/* Left Content */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Chip
                  icon={<BoltRoundedIcon sx={{ fontSize: "16px !important", color: "#6366f1" }} />}
                  label="Ultra-Fast Realtime Messaging"
                  size="small"
                  sx={{
                    mb: 3,
                    backgroundColor: "rgba(99, 102, 241, 0.12)",
                    color: "#a5b4fc",
                    border: "1px solid rgba(99, 102, 241, 0.25)",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    px: 0.5,
                  }}
                />

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.4rem", sm: "3.2rem", md: "3.8rem" },
                    lineHeight: { xs: 1.15, md: 1.1 },
                    fontWeight: 800,
                    color: "#ffffff",
                    letterSpacing: "-0.03em",
                    mb: 2.5,
                  }}
                >
                  Connect &amp; express{" "}
                  <Box
                    component="span"
                    sx={{
                      background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    seamlessly.
                  </Box>
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.15rem" },
                    color: "#94a3b8",
                    lineHeight: 1.6,
                    mb: 4,
                    maxWidth: "520px",
                  }}
                >
                  Whispr delivers lightning-fast, beautifully designed instant messaging.
                  Chat one-on-one with friends or jump into the global real-time stream.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 5,
                  }}
                >
                  <Button
                    component={RouterLink}
                    to="/signup"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardRoundedIcon />}
                    sx={{
                      background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
                      px: { xs: 3, sm: 4 },
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 700,
                      borderRadius: "14px",
                      boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)",
                        boxShadow: "0 14px 30px -5px rgba(99, 102, 241, 0.6)",
                      },
                    }}
                  >
                    Start Chatting Free
                  </Button>

                  <Button
                    component={RouterLink}
                    to="/chat"
                    variant="outlined"
                    size="large"
                    startIcon={<ChatBubbleOutlineRoundedIcon />}
                    sx={{
                      px: { xs: 2.5, sm: 3 },
                      py: 1.5,
                      fontSize: "0.95rem",
                      borderRadius: "14px",
                      borderColor: "rgba(255, 255, 255, 0.15)",
                      color: "#f8fafc",
                      backdropFilter: "blur(10px)",
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      },
                    }}
                  >
                    Open Web App
                  </Button>
                </Box>

                {/* Social Proof */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <AvatarGroup max={4} sx={{ "& .MuiAvatar-root": { width: 32, height: 32, fontSize: 13, borderColor: "#0f172a" } }}>
                    <Avatar sx={{ bgcolor: "#6366f1" }}>S</Avatar>
                    <Avatar sx={{ bgcolor: "#06b6d4" }}>A</Avatar>
                    <Avatar sx={{ bgcolor: "#ec4899" }}>E</Avatar>
                    <Avatar sx={{ bgcolor: "#10b981" }}>M</Avatar>
                  </AvatarGroup>
                  <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.85rem" }}>
                    Joined by thousands of people communicating daily
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            {/* Right Interactive Mockup */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                style={{ width: "100%", display: "flex", justifyContent: "center" }}
              >
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "480px",
                    borderRadius: "24px",
                    background: "rgba(15, 23, 42, 0.75)",
                    backdropFilter: "blur(24px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.15)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* Mock Chat Header */}
                  <Box
                    sx={{
                      padding: "16px 20px",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      background: "rgba(30, 41, 59, 0.4)",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box sx={{ position: "relative" }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: "#6366f1",
                            fontSize: "1rem",
                            fontWeight: 700,
                          }}
                        >
                          E
                        </Avatar>
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            width: 10,
                            height: 10,
                            bgcolor: "#10b981",
                            borderRadius: "50%",
                            border: "2px solid #0f172a",
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#f8fafc" }}>
                          Elena Rostova
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#10b981", fontSize: "0.75rem" }}>
                          Active now
                        </Typography>
                      </Box>
                    </Box>

                    <Chip
                      label="Direct"
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: "0.7rem",
                        bgcolor: "rgba(255, 255, 255, 0.06)",
                        color: "#94a3b8",
                      }}
                    />
                  </Box>

                  {/* Mock Message Thread */}
                  <Box sx={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* Incoming Message */}
                    <Box sx={{ display: "flex", gap: 1.2, alignItems: "flex-end" }}>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: "#6366f1", fontSize: "0.75rem" }}>E</Avatar>
                      <Box
                        sx={{
                          maxWidth: "80%",
                          padding: "10px 14px",
                          borderRadius: "16px 16px 16px 4px",
                          backgroundColor: "rgba(30, 41, 59, 0.8)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          color: "#f1f5f9",
                          fontSize: "0.9rem",
                        }}
                      >
                        Hey! Did you check out the new Whispr experience?
                      </Box>
                    </Box>

                    {/* Outgoing Message */}
                    <Box sx={{ display: "flex", gap: 1.2, alignItems: "flex-end", alignSelf: "flex-end" }}>
                      <Box
                        sx={{
                          maxWidth: "80%",
                          padding: "10px 14px",
                          borderRadius: "16px 16px 4px 16px",
                          background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                          color: "#ffffff",
                          fontSize: "0.9rem",
                          boxShadow: "0 4px 12px rgba(99, 102, 241, 0.25)",
                        }}
                      >
                        Yes! It is completely revamped &mdash; super clean, fast, and responsive.
                      </Box>
                      <DoneAllRoundedIcon sx={{ fontSize: 16, color: "#06b6d4", mb: 0.5 }} />
                    </Box>

                    {/* Incoming Message 2 */}
                    <Box sx={{ display: "flex", gap: 1.2, alignItems: "flex-end" }}>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: "#6366f1", fontSize: "0.75rem" }}>E</Avatar>
                      <Box
                        sx={{
                          maxWidth: "80%",
                          padding: "10px 14px",
                          borderRadius: "16px 16px 16px 4px",
                          backgroundColor: "rgba(30, 41, 59, 0.8)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          color: "#f1f5f9",
                          fontSize: "0.9rem",
                        }}
                      >
                        Love how smooth the typing and live updates feel! 🚀
                      </Box>
                    </Box>
                  </Box>

                  {/* Mock Input Bar */}
                  <Box
                    sx={{
                      padding: "14px 20px",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      background: "rgba(30, 41, 59, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.875rem" }}>
                      Type a message...
                    </Typography>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 8px rgba(99, 102, 241, 0.4)",
                      }}
                    >
                      <ArrowForwardRoundedIcon sx={{ fontSize: 16, color: "#ffffff" }} />
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        {/* Feature Cards Grid */}
        <Box sx={{ py: { xs: 4, md: 6 } }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  padding: 3,
                  borderRadius: "20px",
                  background: "rgba(15, 23, 42, 0.5)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  height: "100%",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    borderColor: "rgba(99, 102, 241, 0.3)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    bgcolor: "rgba(99, 102, 241, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    color: "#818cf8",
                  }}
                >
                  <BoltRoundedIcon />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#f8fafc" }}>
                  Instant Realtime
                </Typography>
                <Typography variant="body2" sx={{ color: "#94a3b8", lineHeight: 1.6 }}>
                  Sub-millisecond messaging powered by cloud sockets and live firestore subscriptions.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  padding: 3,
                  borderRadius: "20px",
                  background: "rgba(15, 23, 42, 0.5)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  height: "100%",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    borderColor: "rgba(6, 182, 212, 0.3)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    bgcolor: "rgba(6, 182, 212, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    color: "#22d3ee",
                  }}
                >
                  <PublicRoundedIcon />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#f8fafc" }}>
                  Global World Chat
                </Typography>
                <Typography variant="body2" sx={{ color: "#94a3b8", lineHeight: 1.6 }}>
                  Connect with the wider community in a public live room without friction.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  padding: 3,
                  borderRadius: "20px",
                  background: "rgba(15, 23, 42, 0.5)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  height: "100%",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    borderColor: "rgba(16, 185, 129, 0.3)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    bgcolor: "rgba(16, 185, 129, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    color: "#34d399",
                  }}
                >
                  <LockOutlinedIcon />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#f8fafc" }}>
                  Private &amp; Secure
                </Typography>
                <Typography variant="body2" sx={{ color: "#94a3b8", lineHeight: 1.6 }}>
                  Direct peer-to-peer conversations stored with modern token authentication.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <FooterComponents />
      </Box>
    </Box>
  );
}

export default React.memo(LandingMain);
