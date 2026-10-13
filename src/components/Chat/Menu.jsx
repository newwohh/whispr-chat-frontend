import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import { ChatsContext } from "../../context/ChatContext";
import { removeUserLocally } from "../../handlers/setLocalStorage";
import { useNavigate } from "react-router-dom";

export default function LongMenu() {
  const { user, setUser } = React.useContext(ChatsContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    removeUserLocally(user);
    if (setUser) {
      setUser(null);
    }
    setAnchorEl(null);
    navigate("/");
  };

  const handleWorld = () => {
    setAnchorEl(null);
    navigate("/worldchat");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        sx={{
          color: "#94a3b8",
          transition: "all 0.2s ease",
          "&:hover": { color: "#ffffff", backgroundColor: "rgba(255, 255, 255, 0.08)" },
        }}
        aria-label="options"
        id="options-button"
        aria-controls={open ? "options-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <MoreVertRoundedIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Menu
        id="options-menu"
        MenuListProps={{
          "aria-labelledby": "options-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: "14px",
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 12px 30px rgba(0, 0, 0, 0.6)",
            minWidth: "160px",
            "& .MuiMenuItem-root": {
              borderRadius: "8px",
              margin: "2px 6px",
              padding: "8px 12px",
              fontSize: "0.875rem",
              "&:hover": {
                backgroundColor: "rgba(99, 102, 241, 0.15)",
                color: "#a5b4fc",
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleWorld}>
          <ListItemIcon sx={{ color: "#06b6d4", minWidth: 32 }}>
            <PublicRoundedIcon sx={{ fontSize: 18 }} />
          </ListItemIcon>
          <ListItemText primary="World Chat" />
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.15) !important", color: "#fca5a5 !important" } }}>
          <ListItemIcon sx={{ color: "#ef4444", minWidth: 32 }}>
            <LogoutRoundedIcon sx={{ fontSize: 18 }} />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </MenuItem>
      </Menu>
    </div>
  );
}
