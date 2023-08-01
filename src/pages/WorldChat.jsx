import React, { useContext, useEffect, useState } from "react";
import Pusher from "pusher-js";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  List,
  ListItemAvatar,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import Background from "../components/Background/Background";
import { ChatsContext } from "../context/ChatContext";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { backendBaseUrl } from "../constants/constants";

function WorldChat() {
  const { user } = useContext(ChatsContext);
  const [username, setUsername] = useState("username");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const navigation = useNavigate();
  let allMessages = [];

  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher("cbdd104b9a7b8c257cca", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("whispr");
    channel.bind("message", function (data) {
      allMessages.push(data);
      return setMessages(allMessages);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setUsername(user.user.name);
    await fetch(backendBaseUrl + "/api/messages/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        message,
      }),
    });
    setMessage("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Background />
      <Button
        sx={{
          position: "absolute",
          marginLeft: "-1300px",
          marginTop: "-700px",
        }}
        onClick={() => navigation(-1)}
      >
        <KeyboardBackspaceIcon />
      </Button>
      <div
        style={{
          // padding: "50px",
          width: "1400px",
          height: "800px",
          backgroundColor: "white",
          borderRadius: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "1200px",
            marginLeft: "100px",
            justifyContent: "center",
            alignItems: "end",
            border: "1px solid transparent",
          }}
        >
          <Divider orientation="vertical" />
          <div
            style={{
              border: "1px solid transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "700px",
              flexDirection: "column",
              width: "400px",
            }}
          >
            {messages.map((message) => {
              return (
                <motion.div
                  initial={{ y: 30 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <List
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row-reverse",
                    }}
                  >
                    <ListItemAvatar sx={{ marginLeft: "8px" }}>
                      <Avatar alt="name">{message.username[0]}</Avatar>
                    </ListItemAvatar>
                    <Chip
                      label={message.message}
                      sx={{
                        height: "50px",
                        marginTop: "10px",
                        fontSize: "18px",
                      }}
                    />
                  </List>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "end",
            marginLeft: "120px",
          }}
        >
          <TextField
            className=""
            value={message}
            sx={{ width: "1000px" }}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            sx={{
              borderRadius: "30px",
              width: "160px",
              height: "53px",
              backgroundColor: "#1da1f2",
              color: "white",
              marginLeft: "20px",
              "&:hover": {
                backgroundColor: "#60dfcd",
              },
            }}
            onClick={(e) => submit(e)}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WorldChat;
