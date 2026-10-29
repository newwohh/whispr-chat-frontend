import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  InputBase,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "elena",
    text: "Hey! Did you check out the new Whispr experience?",
    time: "Just now",
  },
  {
    id: 2,
    sender: "user",
    text: "Yes! Minimal black and white design — pure focus and clarity.",
    time: "Just now",
  },
  {
    id: 3,
    sender: "elena",
    text: "Sharp and sophisticated. Type anything below to test out the real-time feel! 🚀",
    time: "Just now",
  },
];

const SUGGESTIONS = [
  "How fast is Whispr? ⚡",
  "Is World Chat live? 🌍",
  "How do I sign up? ✨",
];

const getElenaReply = (userMessage) => {
  const lower = userMessage.toLowerCase();
  if (lower.includes("fast") || lower.includes("speed") || lower.includes("latency")) {
    return "Whispr uses native WebSockets for bidirectional streaming, ensuring ultra-low latency under 50ms.";
  }
  if (lower.includes("world") || lower.includes("global") || lower.includes("public")) {
    return "Yes! World Chat connects everyone in an open global room in real time. Check the World Chat tab in the nav!";
  }
  if (lower.includes("sign up") || lower.includes("join") || lower.includes("account") || lower.includes("google")) {
    return "You can sign up in 10 seconds or use Google One-Tap. There is also an instant Demo mode!";
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hey there! Nice to meet you. You are chatting with the live preview of Whispr.";
  }
  if (lower.includes("cool") || lower.includes("nice") || lower.includes("great") || lower.includes("love")) {
    return "Glad you like it! Everything is built to keep your messaging clean, instant, and distraction-free.";
  }
  const defaultReplies = [
    "Love that! Whispr is designed for pure focus with zero friction.",
    "Messages flow seamlessly. Ready to try the full app? Click 'Open Web App' above!",
    "Real-time messaging done right. Minimal design, maximum performance.",
    "Everything you see here runs smooth and responsive on both mobile and desktop.",
  ];
  return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
};

export default function InteractiveLandingChat() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text || isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate Elena typing and responding
    setTimeout(() => {
      const reply = getElenaReply(text);
      const elenaMsg = {
        id: Date.now() + 1,
        sender: "elena",
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, elenaMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setInput("");
    setIsTyping(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "480px",
        borderRadius: "16px",
        background: "#0e0e11",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
      }}
    >
      {/* Interactive Chat Header */}
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
                bgcolor: isTyping ? "#a1a1aa" : "#ffffff",
                borderRadius: "50%",
                border: "2px solid #000000",
                transition: "background-color 0.2s ease",
              }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#ffffff" }}>
              Elena Rostova
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: isTyping ? "#ffffff" : "#a1a1aa",
                fontSize: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              {isTyping ? "Typing..." : "Online • Interactive Demo"}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Chip
            label="Live Preview"
            size="small"
            sx={{
              height: 22,
              fontSize: "0.7rem",
              bgcolor: "rgba(255, 255, 255, 0.08)",
              color: "#a1a1aa",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          />
          <IconButton
            size="small"
            onClick={handleReset}
            title="Reset conversation"
            sx={{
              color: "#71717a",
              "&:hover": { color: "#ffffff", backgroundColor: "rgba(255, 255, 255, 0.08)" },
            }}
          >
            <RestartAltRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Message Thread Area */}
      <Box
        sx={{
          padding: "20px 20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 1.8,
          height: "330px",
          overflowY: "auto",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderRadius: "4px",
          },
        }}
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => {
            const isUser = m.sender === "user";
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-end",
                  alignSelf: isUser ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                }}
              >
                {!isUser && (
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      bgcolor: "#27272a",
                      color: "#ffffff",
                      fontSize: "0.75rem",
                      flexShrink: 0,
                    }}
                  >
                    E
                  </Avatar>
                )}

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isUser ? "flex-end" : "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      padding: "10px 14px",
                      borderRadius: isUser ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
                      backgroundColor: isUser ? "#ffffff" : "#27272a",
                      border: isUser ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
                      color: isUser ? "#000000" : "#ffffff",
                      fontSize: "0.88rem",
                      lineHeight: 1.45,
                      fontWeight: isUser ? 500 : 400,
                      wordBreak: "break-word",
                    }}
                  >
                    {m.text}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      mt: 0.4,
                      px: 0.5,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ fontSize: "0.68rem", color: "#71717a" }}
                    >
                      {m.time}
                    </Typography>
                    {isUser && (
                      <DoneAllRoundedIcon
                        sx={{ fontSize: 13, color: "#ffffff" }}
                      />
                    )}
                  </Box>
                </Box>
              </motion.div>
            );
          })}

          {/* Typing Indicator Bubble */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-end",
                alignSelf: "flex-start",
              }}
            >
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  bgcolor: "#27272a",
                  color: "#ffffff",
                  fontSize: "0.75rem",
                  flexShrink: 0,
                }}
              >
                E
              </Avatar>
              <Box
                sx={{
                  padding: "10px 14px",
                  borderRadius: "14px 14px 14px 3px",
                  backgroundColor: "#27272a",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  gap: 0.6,
                  alignItems: "center",
                  height: 38,
                }}
              >
                {[0, 1, 2].map((i) => (
                  <Box
                    key={i}
                    component={motion.span}
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#ffffff",
                      display: "inline-block",
                    }}
                  />
                ))}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </Box>

      {/* Suggested Quick Prompts */}
      <Box
        sx={{
          px: 2,
          pb: 1.2,
          display: "flex",
          gap: 1,
          overflowX: "auto",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {SUGGESTIONS.map((item, idx) => (
          <Chip
            key={idx}
            label={item}
            size="small"
            onClick={() => handleSend(item)}
            disabled={isTyping}
            sx={{
              fontSize: "0.72rem",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              color: "#a1a1aa",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              cursor: "pointer",
              transition: "all 0.15s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                color: "#ffffff",
                borderColor: "rgba(255, 255, 255, 0.3)",
              },
            }}
          />
        ))}
      </Box>

      {/* Interactive Input Bar */}
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        sx={{
          padding: "10px 14px",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          background: "rgba(255, 255, 255, 0.02)",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <InputBase
          inputRef={inputRef}
          fullWidth
          placeholder="Type a message to test..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{
            color: "#ffffff",
            fontSize: "0.875rem",
            px: 1,
            "& input::placeholder": {
              color: "#71717a",
              opacity: 1,
            },
          }}
        />
        <IconButton
          type="submit"
          disabled={!input.trim() || isTyping}
          sx={{
            width: 32,
            height: 32,
            borderRadius: "6px",
            backgroundColor: input.trim() ? "#ffffff" : "rgba(255, 255, 255, 0.1)",
            color: input.trim() ? "#000000" : "#71717a",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: input.trim() ? "#e4e4e7" : "rgba(255, 255, 255, 0.15)",
            },
            "&.Mui-disabled": {
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              color: "#52525b",
            },
          }}
        >
          <SendRoundedIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
