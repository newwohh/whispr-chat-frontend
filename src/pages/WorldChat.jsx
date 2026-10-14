import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { motion } from "framer-motion";
import { v4 as uuid } from "uuid";
import Background from "../components/Background/Background";
import { ChatsContext } from "../context/ChatContext";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useNavigate } from "react-router-dom";
import { titleHandler } from "../actions/actions";
import { createChatSocket, fetchRoomMessages, formatMessageTime } from "../services/chatSocket";
import { backendBaseUrl } from "../constants/constants";

function WorldChat() {
  const { user, setUser } = useContext(ChatsContext);
  const [messages, setMessages] = useState([
    {
      id: "system-welcome",
      username: "System",
      message: "Welcome to Whispr World Chat! Say hello to the globe.",
      date: new Date().toISOString(),
    },
  ]);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [editNameOpen, setEditNameOpen] = useState(false);
  const [tempName, setTempName] = useState("");

  const messagesEndRef = useRef(null);
  const chatSocketRef = useRef(null);
  const navigate = useNavigate();

  // Determine current active username
  const currentUsername =
    user?.user?.name || user?.name || user?.username || "Guest";

  useEffect(() => {
    titleHandler("World Chat");

    // 1. Fetch initial message history from MongoDB
    fetchRoomMessages("world").then((history) => {
      if (history && history.length > 0) {
        const formattedHistory = history.map((m) => ({
          id: m.id || uuid(),
          username: m.senderId || m.username || "Anonymous",
          message: m.text || m.message,
          date: m.date,
          pending: false,
        }));

        setMessages([
          {
            id: "system-welcome",
            username: "System",
            message: "Welcome to Whispr World Chat! Say hello to the globe.",
            date: new Date().toISOString(),
          },
          ...formattedHistory,
        ]);
      }
    });

    // 2. Establish real-time WebSocket connection to 'world' room
    chatSocketRef.current = createChatSocket("world", {
      onConnect: () => {
        setIsConnected(true);
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
      onMessage: (data) => {
        const incomingText = data.text || data.message;
        const incomingUser = data.username || data.senderId || "Anonymous";
        if (!incomingText) return;

        setMessages((prev) => {
          // Check if message with this ID already exists (e.g. from optimistic send)
          if (data.id) {
            const existingIdx = prev.findIndex((m) => m.id === data.id);
            if (existingIdx !== -1) {
              const updated = [...prev];
              updated[existingIdx] = {
                id: data.id,
                username: incomingUser,
                message: incomingText,
                date: data.date,
                pending: false,
              };
              return updated;
            }
          }

          return [
            ...prev,
            {
              id: data.id || uuid(),
              username: incomingUser,
              message: incomingText,
              date: data.date,
              pending: false,
            },
          ];
        });
      },
    });

    return () => {
      if (chatSocketRef.current) {
        chatSocketRef.current.close();
      }
    };
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

    const clientMsgId = uuid();
    const nowIso = new Date().toISOString();

    // 1. Optimistic UI update - message appears immediately
    const optimisticMessage = {
      id: clientMsgId,
      username: currentUsername,
      message: textToSend,
      date: nowIso,
      pending: true,
    };

    setMessages((prev) => [...prev, optimisticMessage]);

    try {
      const payload = {
        id: clientMsgId,
        text: textToSend,
        message: textToSend,
        senderId: currentUsername,
        username: currentUsername,
        room: "world",
        date: nowIso,
      };

      // 2. Send over WebSocket if connected
      const sentOverSocket = chatSocketRef.current?.send(payload);

      // 3. Fallback to REST API if WebSocket is not currently open
      if (!sentOverSocket) {
        const res = await fetch(`${backendBaseUrl}/api/messages/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setMessages((prev) =>
            prev.map((m) => (m.id === clientMsgId ? { ...m, pending: false } : m))
          );
        }
      }
    } catch (error) {
      console.error("Failed to dispatch global message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleUpdateName = () => {
    if (tempName.trim()) {
      const trimmed = tempName.trim();
      const updatedUser = {
        ...(user || {}),
        user: {
          ...(user?.user || {}),
          name: trimmed,
        },
      };
      if (setUser) {
        setUser(updatedUser);
      }
      try {
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (err) {
        // ignore
      }
    }
    setEditNameOpen(false);
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
        backgroundColor: "#000000",
      }}
    >
      <Background />

      <Box
        sx={{
          width: { xs: "100%", md: "min(1100px, 94vw)" },
          height: { xs: "100vh", md: "min(860px, 90vh)" },
          borderRadius: { xs: 0, md: "16px" },
          backgroundColor: "#09090b",
          border: { xs: "none", md: "1px solid rgba(255, 255, 255, 0.12)" },
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
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            background: "#09090b",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <IconButton
              onClick={() => navigate(-1)}
              sx={{
                color: "#a1a1aa",
                p: 0.8,
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.04)",
                "&:hover": { color: "#ffffff", backgroundColor: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              <ArrowBackRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>

            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <PublicRoundedIcon sx={{ fontSize: 20 }} />
            </Box>

            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#ffffff", lineHeight: 1.2 }}>
                  World Chat
                </Typography>
                <Chip
                  label={isConnected ? "LIVE" : "RECONNECTING"}
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    backgroundColor: isConnected ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)",
                    color: isConnected ? "#4ade80" : "#f87171",
                    border: `1px solid ${isConnected ? "rgba(74, 222, 128, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                  }}
                />
              </Box>
              <Typography variant="caption" sx={{ color: "#a1a1aa", fontSize: "0.75rem" }}>
                Public global community stream backed by MongoDB & WebSockets
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {/* Active user handle chip */}
            <Chip
              onClick={() => {
                setTempName(currentUsername);
                setEditNameOpen(true);
              }}
              icon={<EditRoundedIcon sx={{ fontSize: "14px !important", color: "#a1a1aa" }} />}
              label={`@${currentUsername}`}
              size="small"
              sx={{
                cursor: "pointer",
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.12)" },
              }}
            />

            <Button
              size="small"
              onClick={() => navigate("/chat")}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                fontSize: "0.8rem",
                color: "#ffffff",
                borderColor: "rgba(255, 255, 255, 0.25)",
                "&:hover": { borderColor: "#ffffff" },
              }}
              variant="outlined"
            >
              Direct Messages
            </Button>
          </Box>
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
            background: "#000000",
          }}
        >
          {messages.map((item, index) => {
            const isMe = item.username === currentUsername;
            const timeStr = formatMessageTime(item.date);

            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
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
                      bgcolor: isMe ? "#ffffff" : "#27272a",
                      color: isMe ? "#000000" : "#ffffff",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      mb: 0.5,
                    }}
                  >
                    {getInitials(item.username)}
                  </Avatar>

                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start" }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#a1a1aa",
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
                        borderRadius: isMe ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                        backgroundColor: isMe ? "#ffffff" : "#27272a",
                        border: isMe ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
                        color: isMe ? "#000000" : "#ffffff",
                        wordBreak: "break-word",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: "0.92rem",
                          lineHeight: 1.5,
                          fontWeight: isMe ? 500 : 400,
                        }}
                      >
                        {item.message}
                      </Typography>

                      {timeStr && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: 0.5,
                            mt: 0.4,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: "0.68rem",
                              color: isMe ? "rgba(0, 0, 0, 0.6)" : "#a1a1aa",
                            }}
                          >
                            {timeStr}
                          </Typography>
                          {isMe && (
                            <DoneAllRoundedIcon
                              sx={{
                                fontSize: 13,
                                color: item.pending ? "rgba(0,0,0,0.3)" : "rgba(0, 0, 0, 0.7)",
                              }}
                            />
                          )}
                        </Box>
                      )}
                    </Box>
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
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            background: "#09090b",
            display: "flex",
            alignItems: "center",
            gap: 1.2,
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder={`Broadcast as @${currentUsername}...`}
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
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
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
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              color: "#000000",
              fontWeight: 700,
              fontSize: "0.875rem",
              "&:hover": {
                backgroundColor: "#e4e4e7",
              },
            }}
          >
            Send
          </Button>
        </Box>
      </Box>

      {/* Nickname Edit Modal */}
      <Dialog
        open={editNameOpen}
        onClose={() => setEditNameOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#18181b",
            color: "#ffffff",
            borderRadius: "14px",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            p: 1,
            minWidth: 300,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
          Change Nickname
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "#a1a1aa", mb: 2 }}>
            Choose a display handle for the World Chat room:
          </Typography>
          <TextField
            fullWidth
            autoFocus
            size="small"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            placeholder="e.g. Neo, CyberNinja..."
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: "#ffffff",
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setEditNameOpen(false)} sx={{ color: "#a1a1aa" }}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdateName}
            variant="contained"
            sx={{
              backgroundColor: "#ffffff",
              color: "#000000",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#e4e4e7" },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default WorldChat;
