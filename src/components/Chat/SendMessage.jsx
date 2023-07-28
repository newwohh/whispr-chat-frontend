import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import {
  Avatar,
  Button,
  Chip,
  List,
  ListItemAvatar,
  TextField,
} from "@mui/material";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { v4 as uuid } from "uuid";
import { ChatsContext } from "../../context/ChatContext";
import { motion } from "framer-motion";
import useSendMessageStyles from "../../styles/SendMessage";

function SendMessage() {
  const SendMessagesClass = useSendMessageStyles();
  const msginputref = useRef(0);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { selectedUser } = useContext(UserContext);
  const { user } = useContext(ChatsContext);
  let currentUser = user.user.name;

  useEffect(() => {
    if (selectedUser === "" || selectedUser === undefined) {
      return;
    } else {
      const unsub = onSnapshot(doc(db, "chats", selectedUser), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unsub();
      };
    }
  }, [selectedUser]);

  const handleSend = async () => {
    if (text.trim().length === 0) {
      return;
    } else {
      await updateDoc(doc(db, "chats", selectedUser), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser,
          date: Timestamp.now(),
        }),
      });
    }
    setText("");
  };
  let recieverMessages = [];
  let allMessages = messages.map((el, i) => {
    if (el.senderId === currentUser) {
      return el.text;
    } else if (el.senderId !== currentUser) {
      return recieverMessages.push(el.text);
    }
  });

  console.log(messages, text.trim().length);

  return (
    <div>
      <div className={SendMessagesClass.sendmessagecontainer}>
        <div className={SendMessagesClass.recieverclass}>
          {recieverMessages.map((el, i) => {
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
                    flexDirection: "row",
                  }}
                >
                  <ListItemAvatar sx={{ marginLeft: "8px" }}>
                    <Avatar alt="name">{selectedUser[0].toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  <Chip
                    label={el}
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

        <motion.div className={SendMessagesClass.senderclass}>
          {allMessages.map((el, i) => {
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
                    <Avatar alt="name">
                      {user.user.name[0].toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <Chip
                    label={el}
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
        </motion.div>
      </div>

      <div
        style={{
          border: "1px solid transparent",
          height: "100px",
          width: "950px",
        }}
      >
        <TextField
          ref={msginputref}
          label="Write a message...."
          sx={{ width: "770px" }}
          inputProps={{
            style: {
              borderRadius: "50px",
            },
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
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
          onClick={() => handleSend()}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default SendMessage;