import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ChatsContext } from "../../context/ChatContext";
import { removeUserLocally } from "../../handlers/setLocalStorage";
import { useNavigate } from "react-router-dom";

export default function LongMenu() {
  const { user } = React.useContext(ChatsContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigation = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    removeUserLocally(user);
    navigation("/");
  };

  const handleWorld = () => {
    navigation("/worldchat");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        style={{ color: "#1da1f2" }}
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem selected={"Logout"} onClick={handleLogout}>
          Logout
        </MenuItem>
        <MenuItem onClick={handleWorld}>World Chat</MenuItem>
      </Menu>
    </div>
  );
}
