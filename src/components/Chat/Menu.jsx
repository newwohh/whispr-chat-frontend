import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ChatsContext } from "../../context/ChatContext";
import { removeUserLocally } from "../../handlers/setLocalStorage";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;

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

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
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
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem selected={"Logout"} onClick={handleLogout}>
          Logout
        </MenuItem>
        <MenuItem onClick={handleClose}>World Chat</MenuItem>
      </Menu>
    </div>
  );
}
