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
            py: { xs: 5, sm: 7, md: 9 },
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            {/* Left Content */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Chip
                  icon={<BoltRoundedIcon sx={{ fontSize: "16px !important", color: "#818cf8" }} />}
                  label="Fast Realtime Messaging"
                  size="small"
                  sx={{
                    mb: 2.5,
                    backgroundColor: "rgba(79, 70, 229, 0.12)",
                    color: "#c7d2fe",
                    border: "1px solid rgba(79, 70, 229, 0.25)",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                    px: 0.5,
                  }}
                />

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.3rem", sm: "3.2rem", md: "3.8rem" },
                    lineHeight: { xs: 1.15, md: 1.1 },
                    fontWeight: 800,
                    color: "#ffffff",
                    letterSpacing: "-0.03em",
                    mb: 2.5,
                  }}
                >
                  Connect &amp; express{" "}
                  <Box component="span" sx={{ color: "#818cf8" }}>
                    seamlessly.
                  </Box>
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.125rem" },
                    color: "#94a3b8",
                    lineHeight: 1.6,
                    mb: 4,
                    maxWidth: "520px",
                  }}
                >
                  Whispr delivers lightning-fast, minimal instant messaging.
                  Chat one-on-one with friends or jump directly into the global public room.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 4.5,
                  }}
                >
                  <Button
                    component={RouterLink}
                    to="/signup"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardRoundedIcon />}
                    sx={{
                      backgroundColor: "#4f46e5",
                      px: { xs: 3, sm: 4 },
                      py: 1.4,
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      borderRadius: "10px",
                      "&:hover": {
                        backgroundColor: "#4338ca",
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
                      py: 1.4,
                      fontSize: "0.95rem",
                      borderRadius: "10px",
                      borderColor: "rgba(255, 255, 255, 0.15)",
                      color: "#f8fafc",
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.07)",
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      },
                    }}
                  >
                    Open Web App
                  </Button>
                </Box>

                {/* Social Proof */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <AvatarGroup max={4} sx={{ "& .MuiAvatar-root": { width: 32, height: 32, fontSize: 13, borderColor: "#0b0f19", bgcolor: "#4f46e5" } }}>
                    <Avatar>S</Avatar>
                    <Avatar>A</Avatar>
                    <Avatar>E</Avatar>
                    <Avatar>M</Avatar>
                  </AvatarGroup>
                  <Typography variant="body2" sx={{ color: "#64748b", fontSize: "0.85rem" }}>
                    Private peer-to-peer and global realtime messaging
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            {/* Right Clean Mockup */}
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                style={{ width: "100%", display: "flex", justifyContent: "center" }}
              >
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: "480px",
                    borderRadius: "20px",
                    background: "rgba(19, 25, 38, 0.75)",
                    backdropFilter: "blur(24px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
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
                      background: "rgba(19, 25, 38, 0.5)",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box sx={{ position: "relative" }}>
                        <Avatar
                          sx={{
                            width: 38,
                            height: 38,
                            bgcolor: "#4f46e5",
                            fontSize: "0.95rem",
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
                            width: 9,
                            height: 9,
                            bgcolor: "#4f46e5",
                            borderRadius: "50%",
                            border: "2px solid #0b0f19",
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#f8fafc" }}>
                          Elena Rostova
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#818cf8", fontSize: "0.75rem" }}>
                          Online
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
                      <Avatar sx={{ width: 28, height: 28, bgcolor: "#4f46e5", fontSize: "0.75rem" }}>E</Avatar>
                      <Box
                        sx={{
                          maxWidth: "80%",
                          padding: "10px 14px",
                          borderRadius: "14px 14px 14px 4px",
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
                          borderRadius: "14px 14px 4px 14px",
                          backgroundColor: "#4f46e5",
                          color: "#ffffff",
                          fontSize: "0.9rem",
                        }}
                      >
                        Yes! It is completely revamped &mdash; super clean, fast, and responsive.
                      </Box>
                      <DoneAllRoundedIcon sx={{ fontSize: 16, color: "#818cf8", mb: 0.5 }} />
                    </Box>

                    {/* Incoming Message 2 */}
                    <Box sx={{ display: "flex", gap: 1.2, alignItems: "flex-end" }}>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: "#4f46e5", fontSize: "0.75rem" }}>E</Avatar>
                      <Box
                        sx={{
                          maxWidth: "80%",
                          padding: "10px 14px",
                          borderRadius: "14px 14px 14px 4px",
                          backgroundColor: "rgba(30, 41, 59, 0.8)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          color: "#f1f5f9",
                          fontSize: "0.9rem",
                        }}
                      >
                        Love the two-color palette &mdash; looks sharp and professional.
                      </Box>
                    </Box>
                  </Box>

                  {/* Mock Input Bar */}
                  <Box
                    sx={{
                      padding: "14px 20px",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      background: "rgba(19, 25, 38, 0.4)",
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
                        borderRadius: "8px",
                        backgroundColor: "#4f46e5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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
        <Box sx={{ py: { xs: 3, md: 5 } }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  padding: 3,
                  borderRadius: "16px",
                  background: "rgba(19, 25, 38, 0.6)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  height: "100%",
                  transition: "border-color 0.2s ease",
                  "&:hover": {
                    borderColor: "rgba(79, 70, 229, 0.3)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    bgcolor: "rgba(79, 70, 229, 0.15)",
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
                  borderRadius: "16px",
                  background: "rgba(19, 25, 38, 0.6)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  height: "100%",
                  transition: "border-color 0.2s ease",
                  "&:hover": {
                    borderColor: "rgba(79, 70, 229, 0.3)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    bgcolor: "rgba(79, 70, 229, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    color: "#818cf8",
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
                  borderRadius: "16px",
                  background: "rgba(19, 25, 38, 0.6)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  height: "100%",
                  transition: "border-color 0.2s ease",
                  "&:hover": {
                    borderColor: "rgba(79, 70, 229, 0.3)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    bgcolor: "rgba(79, 70, 229, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    color: "#818cf8",
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
