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
        backgroundColor: "#000000",
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
                  icon={<BoltRoundedIcon sx={{ fontSize: "16px !important", color: "#ffffff" }} />}
                  label="Fast Realtime Messaging"
                  size="small"
                  sx={{
                    mb: 2.5,
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    color: "#ffffff",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
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
                  <Box component="span" sx={{ color: "#a1a1aa" }}>
                    seamlessly.
                  </Box>
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.125rem" },
                    color: "#a1a1aa",
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
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      px: { xs: 3, sm: 4 },
                      py: 1.4,
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "#e4e4e7",
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
                      borderRadius: "8px",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                      color: "#ffffff",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderColor: "rgba(255, 255, 255, 0.5)",
                      },
                    }}
                  >
                    Open Web App
                  </Button>
                </Box>

                {/* Social Proof */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <AvatarGroup max={4} sx={{ "& .MuiAvatar-root": { width: 32, height: 32, fontSize: 13, borderColor: "#000000", bgcolor: "#27272a", color: "#ffffff" } }}>
                    <Avatar>S</Avatar>
                    <Avatar>A</Avatar>
                    <Avatar>E</Avatar>
                    <Avatar>M</Avatar>
                  </AvatarGroup>
                  <Typography variant="body2" sx={{ color: "#71717a", fontSize: "0.85rem" }}>
                    Private peer-to-peer and global realtime messaging
                  </Typography>
                </Box>
              </motion.div>
            </Grid>

            {/* Right Clean Black & White Mockup */}
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
                    borderRadius: "16px",
                    background: "#0e0e11",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
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
                      background: "rgba(255, 255, 255, 0.02)",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box sx={{ position: "relative" }}>
                        <Avatar
                          sx={{
                            width: 38,
                            height: 38,
                            bgcolor: "#ffffff",
                            color: "#000000",
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
                            bgcolor: "#ffffff",
                            borderRadius: "50%",
                            border: "2px solid #000000",
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#ffffff" }}>
                          Elena Rostova
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#a1a1aa", fontSize: "0.75rem" }}>
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
                        bgcolor: "rgba(255, 255, 255, 0.08)",
                        color: "#a1a1aa",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    />
                  </Box>

                  {/* Mock Message Thread */}
                  <Box sx={{ padding: "24px 20px", display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* Incoming Message */}
                    <Box sx={{ display: "flex", gap: 1.2, alignItems: "flex-end" }}>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: "#27272a", color: "#ffffff", fontSize: "0.75rem" }}>E</Avatar>
                      <Box
                        sx={{
                          maxWidth: "80%",
                          padding: "10px 14px",
                          borderRadius: "12px 12px 12px 3px",
                          backgroundColor: "#27272a",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          color: "#ffffff",
                          fontSize: "0.9rem",
                        }}
                      >
                        Hey! Did you check out the new Whispr experience?
                      </Box>
                    </Box>

                    {/* Outgoing Message (Crisp White with Black Text) */}
                    <Box sx={{ display: "flex", gap: 1.2, alignItems: "flex-end", alignSelf: "flex-end" }}>
                      <Box
                        sx={{
                          maxWidth: "80%",
                          padding: "10px 14px",
                          borderRadius: "12px 12px 3px 12px",
                          backgroundColor: "#ffffff",
                          color: "#000000",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                        }}
                      >
                        Yes! Minimal black and white design &mdash; pure focus and clarity.
                      </Box>
                      <DoneAllRoundedIcon sx={{ fontSize: 16, color: "#ffffff", mb: 0.5 }} />
                    </Box>

                    {/* Incoming Message 2 */}
                    <Box sx={{ display: "flex", gap: 1.2, alignItems: "flex-end" }}>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: "#27272a", color: "#ffffff", fontSize: "0.75rem" }}>E</Avatar>
                      <Box
                        sx={{
                          maxWidth: "80%",
                          padding: "10px 14px",
                          borderRadius: "12px 12px 12px 3px",
                          backgroundColor: "#27272a",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          color: "#ffffff",
                          fontSize: "0.9rem",
                        }}
                      >
                        Sharp and sophisticated. Exactly what it needed.
                      </Box>
                    </Box>
                  </Box>

                  {/* Mock Input Bar */}
                  <Box
                    sx={{
                      padding: "14px 20px",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      background: "rgba(255, 255, 255, 0.02)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "#71717a", fontSize: "0.875rem" }}>
                      Type a message...
                    </Typography>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "6px",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ArrowForwardRoundedIcon sx={{ fontSize: 16, color: "#000000" }} />
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
                  borderRadius: "12px",
                  background: "#0e0e11",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  height: "100%",
                  transition: "border-color 0.2s ease",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "8px",
                    bgcolor: "rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    color: "#ffffff",
                  }}
                >
                  <BoltRoundedIcon />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#ffffff" }}>
                  Instant Realtime
                </Typography>
                <Typography variant="body2" sx={{ color: "#a1a1aa", lineHeight: 1.6 }}>
                  Sub-millisecond messaging powered by cloud sockets and live firestore subscriptions.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  padding: 3,
                  borderRadius: "12px",
                  background: "#0e0e11",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  height: "100%",
                  transition: "border-color 0.2s ease",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "8px",
                    bgcolor: "rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    color: "#ffffff",
                  }}
                >
                  <PublicRoundedIcon />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#ffffff" }}>
                  Global World Chat
                </Typography>
                <Typography variant="body2" sx={{ color: "#a1a1aa", lineHeight: 1.6 }}>
                  Connect with the wider community in a public live room without friction.
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  padding: 3,
                  borderRadius: "12px",
                  background: "#0e0e11",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  height: "100%",
                  transition: "border-color 0.2s ease",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "8px",
                    bgcolor: "rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    color: "#ffffff",
                  }}
                >
                  <LockOutlinedIcon />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#ffffff" }}>
                  Private &amp; Secure
                </Typography>
                <Typography variant="body2" sx={{ color: "#a1a1aa", lineHeight: 1.6 }}>
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
