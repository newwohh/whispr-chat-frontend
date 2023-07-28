import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ChatsContext } from "../../context/ChatContext";
import { UserContext } from "../../context/UserContext";
import { db } from "../../config/firebase";
import { getDoc, setDoc, doc, onSnapshot } from "firebase/firestore";
import LongMenu from "./Menu";
import useChatsStyle from "../../styles/Chats";

function Chats() {
  const ChatsClass = useChatsStyle();
  const [messages, setMessages] = useState([]);
  const { user } = useContext(ChatsContext);
  const { selectedUser, setSelectedUser } = useContext(UserContext);

  let allUsers;
  if (user === undefined) {
    allUsers = ["loading", "loading", "loading", "loading", "loading"];
  } else {
    allUsers = user.users;
  }

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

  const handleSelect = async (name) => {
    const twovtwochat = user.user.name + name;
    let userSelected = twovtwochat.split("").sort().join("");

    setSelectedUser(userSelected);
    try {
      const res = await getDoc(doc(db, "chats", userSelected));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", userSelected), { messages: [] });
      }
    } catch (error) {
      console.log(error);
    }
  };
  let lastMessage =
    messages[messages.length - 1] === undefined
      ? "select a chat"
      : messages[messages.length - 1].text;
  return (
    <div>
      <div className={ChatsClass.profilediv}>
        <Avatar
          sx={{
            height: "180px",
            width: "180px",
            borderRadius: "50%",
            fontSize: "75px",
          }}
        >
          {user.user.name[0].toUpperCase()}
        </Avatar>
        <Typography sx={{ marginTop: "15px" }}>{user.user.name}</Typography>
        <ListItemText
          secondary={"@" + user.user.name + user.user.id}
          sx={{ marginTop: "5px", marginBottom: "10px" }}
        ></ListItemText>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <LongMenu />
      </div>
      <Divider />
      <div>
        <List
          sx={{
            width: "100%",
            maxWidth: 400,
            bgcolor: "background.paper",
            overflow: "scroll",
            height: "400px",
          }}
        >
          {allUsers.map((el, i) => {
            return (
              <ListItem key={i} alignItems="flex-start">
                <ListItemButton onClick={() => handleSelect(el.name)}>
                  <ListItemAvatar>
                    <Avatar alt={el.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={!el ? "wait" : el.name}
                    secondary={
                      <React.Fragment>
                        {lastMessage === undefined ? "wait" : lastMessage}
                      </React.Fragment>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
}

export default Chats;
