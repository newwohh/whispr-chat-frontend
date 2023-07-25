import React from "react";
import ChatMain from "../components/Chat/ChatMain";

function Chat() {
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
            backgroundImage:
              "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)",
          }}
        >
          <ChatMain />
        </div>
      </div>
    </div>
  );
}

export default Chat;
