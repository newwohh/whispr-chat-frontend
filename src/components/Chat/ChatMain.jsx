import React from "react";
import Background from "../Background/Background";
import { Divider } from "@mui/material";
import SendMessage from "./SendMessage";
import Chats from "./Chats";
import useChatsMain from "../../styles/Chatsmain";

function ChatMain() {
  const ChatsMain = useChatsMain;
  return (
    <div>
      <Background />
      <div>
        <div style={ChatsMain.chatmaincon}>
          <div style={ChatsMain.chatmainsub}>
            <Chats />
          </div>
          <Divider />
          <div style={ChatsMain.chatmainsubtwo}>
            <SendMessage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatMain;
