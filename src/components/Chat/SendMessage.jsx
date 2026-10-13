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
          background: "#000000",
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: "14px",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2.5,
            color: "#ffffff",
          }}
        >
          <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 30 }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#ffffff", mb: 1 }}>
          Your Whispr Messages
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#a1a1aa", maxWidth: "380px", mb: 3.5, lineHeight: 1.6 }}
        >
          Select a contact from the sidebar to start a real-time conversation or jump into the open global channel.
        </Typography>
        <Button
          variant="outlined"
          startIcon={<PublicRoundedIcon />}
          onClick={() => navigate("/worldchat")}
          sx={{
            borderRadius: "8px",
            borderColor: "rgba(255, 255, 255, 0.3)",
            color: "#ffffff",
            "&:hover": {
              borderColor: "#ffffff",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
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
        background: "#000000",
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
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          background: "#09090b",
          zIndex: 5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          {/* Back button for mobile */}
          <IconButton
            onClick={() => setSelectedUser({ name: "", selectedUid: "" })}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              color: "#a1a1aa",
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
                width: 40,
                height: 40,
                fontSize: "1rem",
                fontWeight: 700,
                backgroundColor: "#ffffff",
                color: "#000000",
              }}
            >
              {initial}
            </Avatar>
            <Box
              sx={{
                position: "absolute",
                bottom: 1,
                right: 1,
                width: 9,
                height: 9,
                bgcolor: "#ffffff",
                borderRadius: "50%",
                border: "2px solid #000000",
              }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#ffffff", lineHeight: 1.2 }}>
              {selectedName}
            </Typography>
            <Typography variant="caption" sx={{ color: "#a1a1aa", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 0.5 }}>
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
          background: "#000000",
        }}
      >
        {messages.length === 0 ? (
          <Box sx={{ my: "auto", textAlign: "center", color: "#71717a" }}>
            <Typography variant="body2" sx={{ fontSize: "0.9rem" }}>
              No messages yet with {selectedName}.
            </Typography>
            <Typography variant="caption" sx={{ color: "#71717a" }}>
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
                        bgcolor: "#27272a",
                        color: "#ffffff",
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
                            color: isMe ? "rgba(0, 0, 0, 0.6)" : "#a1a1aa",
                          }}
                        >
                          {timeString}
                        </Typography>
                      )}
                      {isMe && (
                        <DoneAllRoundedIcon
                          sx={{ fontSize: 13, color: "rgba(0, 0, 0, 0.7)" }}
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
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          background: "#09090b",
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
                  bottom: "75px",
                  left: { xs: "10px", sm: "20px" },
                  zIndex: 20,
                  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.9)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
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
              color: showEmoji ? "#ffffff" : "#a1a1aa",
              backgroundColor: showEmoji ? "rgba(255, 255, 255, 0.1)" : "transparent",
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
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                fontSize: "0.92rem",
              },
            }}
          />

          <IconButton
            onClick={handleSend}
            disabled={!text.trim()}
            sx={{
              width: 38,
              height: 38,
              borderRadius: "8px",
              backgroundColor: text.trim() ? "#ffffff" : "rgba(255, 255, 255, 0.08)",
              color: text.trim() ? "#000000" : "#52525b",
              transition: "all 0.15s ease",
              "&:hover": {
                backgroundColor: text.trim() ? "#e4e4e7" : "rgba(255, 255, 255, 0.08)",
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
