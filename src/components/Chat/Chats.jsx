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
  const ChatsClass = useChatsStyle;
  const [messages, setMessages] = useState([]);
  const [select, setSelect] = useState("");
  const { user } = useContext(ChatsContext);
  const { selectedUser, setSelectedUser } = useContext(UserContext);

  let allUsers;
  if (user === undefined) {
    allUsers = ["loading", "loading", "loading", "loading", "loading"];
  } else {
    allUsers = user.users;
  }

  useEffect(() => {
    if (selectedUser.name === "" || selectedUser.name === undefined) {
      return;
    } else {
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

  const handleSelect = async (CurrName) => {
    setSelect(CurrName);
    const twovtwochat = user.user.name + CurrName;
    let userSelected = twovtwochat.split("").sort().join("");
    setSelectedUser({
      ...selectedUser,
      selectedUid: userSelected,
      name: CurrName,
    });
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
      <div style={ChatsClass.profilediv}>
        <Avatar
          sx={{
            height: "120px",
            width: "120px",
            borderRadius: "50%",
            fontSize: "75px",
            backgroundColor: "white",
            color: "#1da1f2",
            border: "2px solid #1da1f2",
          }}
        >
          {user.user.name[0].toUpperCase()}
        </Avatar>
        <Typography sx={{ marginTop: "15px", color: "#1da1f2" }}>
          {user.user.name}
        </Typography>
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
            overflow: "scroll",
            height: "400px",
          }}
        >
          {allUsers.map((el, i) => {
            const isSelected = el.name === select;
            return (
              <ListItem key={i} alignItems="flex-start">
                <ListItemButton
                  selected={isSelected}
                  onClick={() => handleSelect(el.name)}
                >
                  <ListItemAvatar>
                    <Avatar alt={el.name} />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ color: "#1da1f2" }}
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
