import React, { useContext, useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import Background from "../components/Background/Background";
import { ChatsContext } from "../context/ChatContext";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import { useNavigate } from "react-router-dom";
import { backendBaseUrl } from "../constants/constants";
import { titleHandler } from "../actions/actions";

function WorldChat() {
  const { user } = useContext(ChatsContext);
  const [messages, setMessages] = useState([
    { username: "System", message: "Welcome to Whispr World Chat! Say hello to the globe." },
  ]);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const currentUsername = user?.user?.name || "Guest";

  useEffect(() => {
    titleHandler("World Chat");

    let pusher;
    try {
      pusher = new Pusher("cbdd104b9a7b8c257cca", {
        cluster: "ap2",
      });
      const channel = pusher.subscribe("whispr");
      channel.bind("message", (data) => {
        if (data && data.message) {
          setMessages((prev) => [...prev, data]);
        }
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
        pusher.disconnect();
      };
    } catch (e) {
      console.error("Pusher connection error:", e);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submit = async (e) => {
    if (e) e.preventDefault();
    if (!message.trim() || isSending) return;

    const textToSend = message.trim();
    setMessage("");
    setIsSending(true);

    try {
      await fetch(backendBaseUrl + "/api/messages/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: currentUsername,
          message: textToSend,
        }),
      });
    } catch (error) {
      console.error("Failed to post message:", error);
      // Local optimistic update if backend is offline
      setMessages((prev) => [
        ...prev,
        { username: currentUsername, message: textToSend },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 0, md: 3 },
      }}
    >
      <Background />

      <Box
        sx={{
          width: { xs: "100%", md: "min(1100px, 94vw)" },
          height: { xs: "100vh", md: "min(860px, 90vh)" },
          borderRadius: { xs: 0, md: "24px" },
          backgroundColor: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(24px)",
          border: { xs: "none", md: "1px solid rgba(255, 255, 255, 0.1)" },
          boxShadow: { xs: "none", md: "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(6, 182, 212, 0.12)" },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* World Chat Header */}
        <Box
          sx={{
            padding: { xs: "12px 16px", sm: "16px 24px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            background: "rgba(15, 23, 42, 0.8)",
            backdropFilter: "blur(16px)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <IconButton
              onClick={() => navigate(-1)}
              sx={{
                color: "#94a3b8",
                p: 0.8,
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.04)",
                "&:hover": { color: "#ffffff", backgroundColor: "rgba(255, 255, 255, 0.08)" },
              }}
            >
              <ArrowBackRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>

            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)",
                border: "1px solid rgba(6, 182, 212, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#22d3ee",
              }}
            >
              <PublicRoundedIcon sx={{ fontSize: 22 }} />
            </Box>

            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#ffffff", lineHeight: 1.2 }}>
                  World Chat
                </Typography>
                <Chip
                  label="LIVE"
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                    color: "#34d399",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                  }}
                />
              </Box>
              <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.75rem" }}>
                Public global community stream
              </Typography>
            </Box>
          </Box>

          <Button
            size="small"
            onClick={() => navigate("/chat")}
            sx={{
              display: { xs: "none", sm: "inline-flex" },
              fontSize: "0.8rem",
              color: "#818cf8",
              borderColor: "rgba(99, 102, 241, 0.3)",
            }}
            variant="outlined"
          >
            Direct Messages
          </Button>
        </Box>

        {/* Message Stream */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            padding: { xs: "16px 14px", sm: "24px 28px" },
            display: "flex",
            flexDirection: "column",
            gap: 1.8,
            background: "rgba(10, 15, 29, 0.5)",
          }}
        >
          {messages.map((item, index) => {
            const isMe = item.username === currentUsername;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                style={{
                  display: "flex",
                  justifyContent: isMe ? "flex-end" : "flex-start",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: 1.2,
                    maxWidth: { xs: "88%", sm: "75%", md: "65%" },
                    flexDirection: isMe ? "row-reverse" : "row",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      bgcolor: isMe ? "#6366f1" : "#0f766e",
                      color: "#ffffff",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      mb: 0.5,
                    }}
                  >
                    {getInitials(item.username)}
                  </Avatar>

                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start" }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: isMe ? "#818cf8" : "#94a3b8",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        mb: 0.3,
                        px: 0.5,
                      }}
                    >
                      {item.username}
                    </Typography>

                    <Box
                      sx={{
                        padding: "10px 16px",
                        borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                        background: isMe
                          ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
                          : "rgba(30, 41, 59, 0.8)",
                        border: isMe ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
                        color: "#ffffff",
                        boxShadow: isMe
                          ? "0 4px 14px rgba(99, 102, 241, 0.25)"
                          : "0 2px 8px rgba(0, 0, 0, 0.2)",
                        wordBreak: "break-word",
                      }}
                    >
                      <Typography variant="body2" sx={{ fontSize: "0.92rem", lineHeight: 1.5 }}>
                        {item.message}
                      </Typography>
                    </Box>

                    {isMe && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.3, pr: 0.5 }}>
                        <DoneAllRoundedIcon sx={{ fontSize: 13, color: "#818cf8" }} />
                      </Box>
                    )}
                  </Box>
                </Box>
              </motion.div>
            );
          })}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Bar */}
        <Box
          component="form"
          onSubmit={submit}
          sx={{
            padding: { xs: "12px 14px", sm: "16px 24px" },
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            background: "rgba(15, 23, 42, 0.8)",
            backdropFilter: "blur(16px)",
            display: "flex",
            alignItems: "center",
            gap: 1.2,
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Broadcast a message to everyone..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(e);
              }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "14px",
                backgroundColor: "rgba(30, 41, 59, 0.6)",
                fontSize: "0.92rem",
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={!message.trim() || isSending}
            endIcon={<SendRoundedIcon sx={{ fontSize: "16px !important" }} />}
            sx={{
              py: 1.1,
              px: { xs: 2, sm: 3 },
              borderRadius: "12px",
              background: "linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)",
              fontWeight: 700,
              fontSize: "0.875rem",
              boxShadow: "0 4px 14px rgba(6, 182, 212, 0.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #0891b2 0%, #4f46e5 100%)",
              },
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default WorldChat;
