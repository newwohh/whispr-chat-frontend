import React, { useContext } from "react";
import Background from "../Background/Background";
import { Box } from "@mui/material";
import SendMessage from "./SendMessage";
import Chats from "./Chats";
import { UserContext } from "../../context/UserContext";

function ChatMain() {
  const { selectedUser } = useContext(UserContext);
  const hasSelectedUser = Boolean(selectedUser?.name);

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
          width: { xs: "100%", md: "min(1360px, 94vw)" },
          height: { xs: "100vh", md: "min(860px, 90vh)" },
          borderRadius: { xs: 0, md: "24px" },
          backgroundColor: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(24px)",
          border: { xs: "none", md: "1px solid rgba(255, 255, 255, 0.1)" },
          boxShadow: { xs: "none", md: "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(99, 102, 241, 0.1)" },
          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* Sidebar / Contacts List */}
        <Box
          sx={{
            width: { xs: "100%", md: "360px", lg: "380px" },
            flexShrink: 0,
            display: {
              xs: hasSelectedUser ? "none" : "flex",
              md: "flex",
            },
            height: "100%",
          }}
        >
          <Chats />
        </Box>

        {/* Chat Thread Pane */}
        <Box
          sx={{
            flex: 1,
            display: {
              xs: hasSelectedUser ? "flex" : "none",
              md: "flex",
            },
            height: "100%",
            minWidth: 0,
          }}
        >
          <SendMessage />
        </Box>
      </Box>
    </Box>
  );
}

export default ChatMain;
