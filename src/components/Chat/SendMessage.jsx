import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import {
  Avatar,
  Box,
  Button,
  Chip,
  ClickAwayListener,
  List,
  ListItemAvatar,
  TextField,
  Typography,
} from "@mui/material";
import Face6Icon from "@mui/icons-material/Face6";
import {
  Timestamp,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { v4 as uuid } from "uuid";
import { ChatsContext } from "../../context/ChatContext";
import { motion } from "framer-motion";
import useSendMessageStyles from "../../styles/SendMessage";
import EmojiPicker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

function SendMessage() {
  const [online, setOnline] = useState(Boolean);
  const [Emoji, setEmoji] = useState(false);
  const SendMessagesClass = useSendMessageStyles;
  const msginputref = useRef(0);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { selectedUser } = useContext(UserContext);
  const { user } = useContext(ChatsContext);
  let currentUser = user.user.name;
  let selectedUserProfile =
    selectedUser.name === ""
      ? "please select"
      : `${selectedUser?.name[0].toUpperCase()}${selectedUser?.name?.slice(1)}`;
  useEffect(() => {
    if (selectedUser.name === "" || selectedUser.name === undefined) {
      return;
    } else {
      setOnline(navigator.onLine === true);
      const unsub = onSnapshot(
        doc(db, "chats", selectedUser.selectedUid),
        (doc) => {
          doc.exists() && setMessages(doc.data().messages);
        }
      );

      return () => {
        unsub();
      };
    }
  }, [selectedUser]);

  const handleSend = async () => {
    if (text.trim().length === 0) {
      return;
    } else {
      const twovtwochat = user.user.name + selectedUser.name;
      let userSelected = twovtwochat.split("").sort().join("");
      const res = await getDoc(doc(db, "chats", userSelected));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", userSelected), {
          messages: [],
        });
      } else {
        await updateDoc(doc(db, "chats", userSelected), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser,
            date: Timestamp.now(),
          }),
        });
      }
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

  const onEmojiClick = (emojiObj) => {
    setText(emojiObj.emoji);
  };

  return (
    <div>
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
        style={{
          zIndex: 1,
          position: "absolute",
          // borderRadius: "50px",
          display: "flex",
          height: "100px",
          width: "950px",
          border: "1px solid transparent",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "white",
          marginTop: "-10px",
          boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {online ? (
            <Face6Icon
              sx={{
                color: "#1da1f2",
                marginLeft: "32px",
                height: "100px",
                width: "50px",
              }}
            />
          ) : (
            <Face6Icon
              sx={{
                color: "white",
                marginLeft: "32px",
                height: "100px",
                width: "50px",
              }}
            />
          )}

          <Typography
            variant="h6"
            sx={{
              marginLeft: "3px",
              marginBottom: "0px",
              fontSize: "30px",
              color: "grey",
            }}
          >
            {selectedUserProfile}
          </Typography>
        </div>
      </motion.div>
      <div style={SendMessagesClass.sendmessagecontainer}>
        <div style={SendMessagesClass.recieverclass}>
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
                    <Avatar alt="name">
                      {selectedUser.name[0].toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <Chip
                    label={el}
                    sx={{
                      height: "50px",
                      marginTop: "10px",
                      fontSize: "18px",
                      backgroundColor: "#1da1f2",
                      color: "white",
                    }}
                  />
                </List>
              </motion.div>
            );
          })}
        </div>

        <motion.div style={SendMessagesClass.senderclass}>
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
                      backgroundColor: "#1da1f2",
                      color: "white",
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
          display: "flex",
          overflow: "hidden",
        }}
      >
        <TextField
          ref={msginputref}
          label="Write a message...."
          sx={{ width: "900px", marginTop: "20px" }}
          inputProps={{
            style: {
              borderRadius: "50px",
            },
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {Emoji ? (
          <ClickAwayListener onClickAway={() => setEmoji(false)}>
            <Box sx={{ zIndex: 1, height: "500px" }}>
              <EmojiPicker onEmojiClick={(e, el) => console.log(el.emoji)} />
            </Box>
          </ClickAwayListener>
        ) : (
          <Button onClick={() => setEmoji(!Emoji)}>
            <EmojiEmotionsIcon />
          </Button>
        )}
        <Button
          sx={{
            borderRadius: "30px",
            width: "160px",
            height: "53px",
            backgroundColor: "#1da1f2",
            color: "white",
            marginLeft: "20px",
            marginTop: "20px",
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
