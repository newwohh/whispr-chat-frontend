import React from "react";
import Background from "../Background/Background";
import { Divider } from "@mui/material";
import SendMessage from "./SendMessage";
import Chats from "./Chats";

function ChatMain() {
  return (
    <div>
      <Background />
      <div>
        <div
          style={{
            display: "flex",
            padding: "50px",
            width: "1400px",
            height: "700px",
            backgroundColor: "white",
            borderRadius: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "400px",
              marginRight: "15px",
            }}
          >
            <Chats />
          </div>
          <Divider />
          <div
            style={{
              width: "950px",
              border: "1px solid transparent",
              marginLeft: "10px",
            }}
          >
            <SendMessage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMain;
