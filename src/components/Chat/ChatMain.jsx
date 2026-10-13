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
        backgroundColor: "#000000",
      }}
    >
      <Background />

      <Box
        sx={{
          width: { xs: "100%", md: "min(1360px, 94vw)" },
          height: { xs: "100vh", md: "min(860px, 90vh)" },
          borderRadius: { xs: 0, md: "16px" },
          backgroundColor: "#09090b",
          border: { xs: "none", md: "1px solid rgba(255, 255, 255, 0.12)" },
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
