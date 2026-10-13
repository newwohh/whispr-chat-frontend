import React, { useEffect } from "react";
import ChatMain from "../components/Chat/ChatMain";
import { titleHandler } from "../actions/actions";
import { motion } from "framer-motion";

function Chat() {
  useEffect(() => {
    titleHandler("Messages");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ width: "100%", minHeight: "100vh" }}
    >
      <ChatMain />
    </motion.div>
  );
}

export default Chat;
