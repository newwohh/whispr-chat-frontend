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
import React, { useContext } from "react";
import img from "../../assets/hero-landing-3.jpg";
import { ChatsContext } from "../../context/ChatContext";

function Chats() {
  const { user } = useContext(ChatsContext);
  let name;
  if (user === undefined) {
    name = "wait";
  } else {
    name = user.user.name;
  }
  return (
    <div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={img}
          alt="profile"
          style={{ height: "180px", width: "180px", borderRadius: "50%" }}
        />
        <Typography sx={{ marginTop: "15px" }}>{user.user.name}</Typography>
        <ListItemText
          secondary="@username"
          sx={{ marginTop: "5px", marginBottom: "10px" }}
        ></ListItemText>
      </div>
      <Divider />
      <div>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            overflow: "scroll",
          }}
        >
          {[1, 2, 3, 4].map((el, i) => {
            return (
              <ListItem key={i} alignItems="flex-start">
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="John Doe"
                    secondary={
                      <React.Fragment>
                        {"I'll be in your neighborhood doing errands this…"}
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
