import React from "react";
import ChatMain from "../components/Chat/ChatMain";
import { titleHandler } from "../actions/actions";

function Chat() {
  titleHandler("Chat,Share and Express");
  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundSize: "cover",
            height: "100vh",
          }}
        >
          <ChatMain />
        </div>
      </div>
    </div>
  );
}

export default Chat;
