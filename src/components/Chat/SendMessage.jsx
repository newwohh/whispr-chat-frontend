import React, { useContext } from "react";
import { ChatsContext } from "../../context/ChatContext";

function SendMessage() {
  const { user } = useContext(ChatsContext);

  return <div>{user}</div>;
}

export default SendMessage;
