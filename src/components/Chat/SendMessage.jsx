import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import {
  Avatar,
  Box,
  IconButton,
  TextField,
  Typography,
  ClickAwayListener,
  Button,
} from "@mui/material";
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { v4 as uuid } from "uuid";
import { ChatsContext } from "../../context/ChatContext";
import { motion, AnimatePresence } from "framer-motion";
import EmojiPicker, { Theme as EmojiTheme } from "emoji-picker-react";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import { useNavigate } from "react-router-dom";

function SendMessage() {
  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { selectedUser, setSelectedUser } = useContext(UserContext);
  const { user } = useContext(ChatsContext);
  const navigate = useNavigate();

  const currentUser = user?.user?.name || "Guest";
  const isUserSelected = Boolean(selectedUser?.name && selectedUser?.selectedUid);

  useEffect(() => {
    if (!isUserSelected) {
      setMessages([]);
      return;
    }

    const unsub = onSnapshot(
      doc(db, "chats", selectedUser.selectedUid),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setMessages(Array.isArray(data.messages) ? data.messages : []);
        } else {
          setMessages([]);
        }
      },
      (error) => {
        console.error("Firestore listener error:", error);
      }
    );

    return () => unsub();
  }, [selectedUser, isUserSelected]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim() || !isUserSelected) return;

    const messageText = text.trim();
    setText("");

    try {
      const chatDocRef = doc(db, "chats", selectedUser.selectedUid);
      const res = await getDoc(chatDocRef);

      const newMessage = {
        id: uuid(),
        text: messageText,
        senderId: currentUser,
        date: Timestamp.now(),
      };

      if (!res.exists()) {
        await setDoc(chatDocRef, {
          messages: [newMessage],
        });
      } else {
        await updateDoc(chatDocRef, {
          messages: arrayUnion(newMessage),
        });
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleEmojiClick = (emojiData) => {
    if (emojiData && emojiData.emoji) {
      setText((prev) => prev + emojiData.emoji);
    }
  };

  const formatMessageTime = (dateObj) => {
    if (!dateObj) return "";
    try {
      if (typeof dateObj.toDate === "function") {
        return dateObj.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      }
      if (dateObj.seconds) {
        return new Date(dateObj.seconds * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      }
    } catch (e) {
      // fallback
    }
    return "";
  };

  if (!isUserSelected) {
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
          textAlign: "center",
          background: "rgba(10, 15, 29, 0.4)",
        }}
      >
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "24px",
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)",
            border: "1px solid rgba(99, 102, 241, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2.5,
            color: "#818cf8",
          }}
        >
          <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 36 }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#f8fafc", mb: 1 }}>
          Your Whispr Messages
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#94a3b8", maxWidth: "380px", mb: 3.5, lineHeight: 1.6 }}
        >
          Select a contact from the sidebar to start a real-time conversation or jump into the open global channel.
        </Typography>
        <Button
          variant="outlined"
          startIcon={<PublicRoundedIcon />}
          onClick={() => navigate("/worldchat")}
          sx={{
            borderRadius: "12px",
            borderColor: "rgba(6, 182, 212, 0.4)",
            color: "#22d3ee",
            "&:hover": {
              borderColor: "#06b6d4",
              backgroundColor: "rgba(6, 182, 212, 0.08)",
            },
          }}
        >
          Open World Chat Room
        </Button>
      </Box>
    );
  }

  const selectedName = selectedUser.name;
  const initial = selectedName.charAt(0).toUpperCase();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        background: "rgba(10, 15, 29, 0.6)",
        position: "relative",
      }}
    >
      {/* Active Chat Header */}
      <Box
        sx={{
          padding: { xs: "12px 16px", sm: "16px 20px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(16px)",
          zIndex: 5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* Back button for mobile */}
          <IconButton
            onClick={() => setSelectedUser({ name: "", selectedUid: "" })}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              color: "#94a3b8",
              p: 0.5,
              mr: 0.5,
              "&:hover": { color: "#ffffff" },
            }}
          >
            <ArrowBackRoundedIcon />
          </IconButton>

          <Box sx={{ position: "relative" }}>
            <Avatar
              sx={{
                width: 42,
                height: 42,
                fontSize: "1.05rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
                color: "#ffffff",
              }}
            >
              {initial}
            </Avatar>
            <Box
              sx={{
                position: "absolute",
                bottom: 1,
                right: 1,
                width: 10,
                height: 10,
                bgcolor: "#10b981",
                borderRadius: "50%",
                border: "2px solid #0f172a",
              }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#f8fafc", lineHeight: 1.2 }}>
              {selectedName}
            </Typography>
            <Typography variant="caption" sx={{ color: "#10b981", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 0.5 }}>
              ● Online &amp; active
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Message Timeline */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: { xs: "16px 14px", sm: "20px 24px" },
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {messages.length === 0 ? (
          <Box sx={{ my: "auto", textAlign: "center", color: "#64748b" }}>
            <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
              No messages yet with {selectedName}.
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748b" }}>
              Send a greeting below to start the conversation! 👋
            </Typography>
          </Box>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.senderId === currentUser;
            const timeString = formatMessageTime(msg.date);

            return (
              <motion.div
                key={msg.id || idx}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
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
                    gap: 1,
                    maxWidth: { xs: "85%", sm: "70%" },
                    flexDirection: isMe ? "row-reverse" : "row",
                  }}
                >
                  {!isMe && (
                    <Avatar
                      sx={{
                        width: 28,
                        height: 28,
                        fontSize: "0.75rem",
                        bgcolor: "rgba(99, 102, 241, 0.3)",
                        color: "#a5b4fc",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        mb: 0.5,
                      }}
                    >
                      {initial}
                    </Avatar>
                  )}

                  <Box
                    sx={{
                      padding: "10px 15px",
                      borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      background: isMe
                        ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
                        : "rgba(30, 41, 59, 0.8)",
                      border: isMe
                        ? "none"
                        : "1px solid rgba(255, 255, 255, 0.08)",
                      color: "#ffffff",
                      boxShadow: isMe
                        ? "0 4px 14px rgba(99, 102, 241, 0.25)"
                        : "0 2px 8px rgba(0, 0, 0, 0.2)",
                      wordBreak: "break-word",
                    }}
                  >
                    <Typography variant="body2" sx={{ fontSize: "0.92rem", lineHeight: 1.5 }}>
                      {msg.text}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 0.5,
                        mt: 0.5,
                      }}
                    >
                      {timeString && (
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: "0.68rem",
                            color: isMe ? "rgba(255, 255, 255, 0.7)" : "#64748b",
                          }}
                        >
                          {timeString}
                        </Typography>
                      )}
                      {isMe && (
                        <DoneAllRoundedIcon
                          sx={{ fontSize: 13, color: "rgba(255, 255, 255, 0.8)" }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Bar */}
      <Box
        sx={{
          padding: { xs: "12px 14px", sm: "16px 20px" },
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          background: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(16px)",
          position: "relative",
        }}
      >
        {/* Emoji Picker Popover */}
        <AnimatePresence>
          {showEmoji && (
            <ClickAwayListener onClickAway={() => setShowEmoji(false)}>
              <Box
                sx={{
                  position: "absolute",
                  bottom: "80px",
                  left: { xs: "10px", sm: "20px" },
                  zIndex: 20,
                  boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                <EmojiPicker
                  theme={EmojiTheme.DARK}
                  onEmojiClick={handleEmojiClick}
                  searchPlaceHolder="Search emoji..."
                  width={320}
                  height={400}
                />
              </Box>
            </ClickAwayListener>
          )}
        </AnimatePresence>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={() => setShowEmoji(!showEmoji)}
            sx={{
              color: showEmoji ? "#818cf8" : "#94a3b8",
              backgroundColor: showEmoji ? "rgba(99, 102, 241, 0.15)" : "transparent",
              "&:hover": { color: "#ffffff", backgroundColor: "rgba(255, 255, 255, 0.08)" },
            }}
          >
            <EmojiEmotionsOutlinedIcon />
          </IconButton>

          <TextField
            inputRef={inputRef}
            fullWidth
            size="small"
            placeholder={`Message ${selectedName}...`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
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

          <IconButton
            onClick={handleSend}
            disabled={!text.trim()}
            sx={{
              width: 42,
              height: 42,
              borderRadius: "12px",
              background: text.trim()
                ? "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)"
                : "rgba(255, 255, 255, 0.06)",
              color: text.trim() ? "#ffffff" : "#475569",
              boxShadow: text.trim() ? "0 4px 14px rgba(99, 102, 241, 0.4)" : "none",
              transition: "all 0.2s ease",
              "&:hover": {
                background: text.trim()
                  ? "linear-gradient(135deg, #4f46e5 0%, #0891b2 100%)"
                  : "rgba(255, 255, 255, 0.06)",
              },
            }}
          >
            <SendRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default SendMessage;
