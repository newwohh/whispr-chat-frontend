import {
  Avatar,
  Box,
  Divider,
  InputAdornment,
  List,
  ListItemButton,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ChatsContext } from "../../context/ChatContext";
import { UserContext } from "../../context/UserContext";
import { db } from "../../config/firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";
import LongMenu from "./Menu";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import { useNavigate } from "react-router-dom";

function Chats() {
  const [search, setSearch] = useState("");
  const { user } = useContext(ChatsContext);
  const { selectedUser, setSelectedUser } = useContext(UserContext);
  const navigate = useNavigate();

  const currentUser = user?.user || { name: "Guest", id: "0" };
  const allUsers = Array.isArray(user?.users)
    ? user.users
    : [
        { name: "Sarah Connor", id: "1" },
        { name: "Alex Rivera", id: "2" },
        { name: "Elena Rostova", id: "3" },
        { name: "Marcus Vance", id: "4" },
      ];

  const filteredUsers = allUsers.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = async (currName) => {
    const twovtwochat = (currentUser.name || "user") + currName;
    const userSelected = twovtwochat.split("").sort().join("");
    setSelectedUser({
      selectedUid: userSelected,
      name: currName,
    });
    try {
      const res = await getDoc(doc(db, "chats", userSelected));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", userSelected), { messages: [] });
      }
    } catch (error) {
      console.error("Firestore chat init error:", error);
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        background: "rgba(15, 23, 42, 0.8)",
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Current User Header */}
      <Box
        sx={{
          padding: { xs: "16px 14px", sm: "18px 16px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              sx={{
                width: 44,
                height: 44,
                fontSize: "1.1rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
                color: "#ffffff",
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.35)",
              }}
            >
              {getInitials(currentUser.name)}
            </Avatar>
            <Box
              sx={{
                position: "absolute",
                bottom: 1,
                right: 1,
                width: 10,
                height: 10,
                bgcolor: "#10b981",
                borderRadius: "50%",
                border: "2px solid #0f172a",
              }}
            />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              noWrap
              sx={{ fontWeight: 700, color: "#f8fafc", lineHeight: 1.2 }}
            >
              {currentUser.name}
            </Typography>
            <Typography
              variant="caption"
              noWrap
              sx={{ color: "#94a3b8", fontSize: "0.75rem" }}
            >
              @{currentUser.name?.toLowerCase().replace(/\s+/g, "") || "whispr"}
            </Typography>
          </Box>
        </Box>

        <LongMenu />
      </Box>

      {/* World Chat Quick Access Banner */}
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <ListItemButton
          onClick={() => navigate("/worldchat")}
          sx={{
            borderRadius: "12px",
            backgroundColor: "rgba(6, 182, 212, 0.08)",
            border: "1px solid rgba(6, 182, 212, 0.2)",
            p: "10px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(6, 182, 212, 0.16)",
              borderColor: "rgba(6, 182, 212, 0.4)",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <PublicRoundedIcon sx={{ color: "#06b6d4", fontSize: 20 }} />
            <Box>
              <Typography sx={{ color: "#f8fafc", fontSize: "0.85rem", fontWeight: 700 }}>
                World Chat Room
              </Typography>
              <Typography sx={{ color: "#94a3b8", fontSize: "0.75rem" }}>
                Public live stream
              </Typography>
            </Box>
          </Box>
          <Chip
            label="LIVE"
            size="small"
            sx={{
              height: 18,
              fontSize: "0.65rem",
              fontWeight: 800,
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              color: "#34d399",
            }}
          />
        </ListItemButton>
      </Box>

      {/* Search Input */}
      <Box sx={{ px: 2, py: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: "#64748b", fontSize: 18 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              fontSize: "0.85rem",
              backgroundColor: "rgba(30, 41, 59, 0.4)",
            },
          }}
        />
      </Box>

      <Box
        sx={{
          px: 2.5,
          pt: 1.5,
          pb: 0.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "#64748b",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontSize: "0.7rem",
          }}
        >
          Conversations
        </Typography>
        <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.75rem" }}>
          {filteredUsers.length}
        </Typography>
      </Box>

      <Divider sx={{ mx: 2, borderColor: "rgba(255, 255, 255, 0.06)" }} />

      {/* Conversation List */}
      <List
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 1.5,
          py: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
        }}
      >
        {filteredUsers.map((userItem, i) => {
          const isSelected = userItem.name === selectedUser.name;
          return (
            <ListItemButton
              key={userItem.id || i}
              selected={isSelected}
              onClick={() => handleSelect(userItem.name)}
              sx={{
                borderRadius: "12px",
                padding: "10px 12px",
                border: "1px solid",
                borderColor: isSelected ? "rgba(99, 102, 241, 0.4)" : "transparent",
                backgroundColor: isSelected
                  ? "rgba(99, 102, 241, 0.15) !important"
                  : "transparent",
                transition: "all 0.15s ease",
                "&:hover": {
                  backgroundColor: isSelected
                    ? "rgba(99, 102, 241, 0.2)"
                    : "rgba(255, 255, 255, 0.04)",
                },
              }}
            >
              <Box sx={{ position: "relative", mr: 1.5 }}>
                <Avatar
                  sx={{
                    width: 38,
                    height: 38,
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    bgcolor: isSelected ? "#6366f1" : "rgba(30, 41, 59, 0.9)",
                    color: isSelected ? "#ffffff" : "#a5b4fc",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {getInitials(userItem.name)}
                </Avatar>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 9,
                    height: 9,
                    bgcolor: "#10b981",
                    borderRadius: "50%",
                    border: "2px solid #0f172a",
                  }}
                />
              </Box>

              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 0.3,
                  }}
                >
                  <Typography
                    variant="body2"
                    noWrap
                    sx={{
                      fontWeight: isSelected ? 700 : 600,
                      color: isSelected ? "#ffffff" : "#f1f5f9",
                      fontSize: "0.875rem",
                    }}
                  >
                    {userItem.name}
                  </Typography>
                </Box>
                <Typography
                  variant="caption"
                  noWrap
                  sx={{
                    color: isSelected ? "#c7d2fe" : "#64748b",
                    fontSize: "0.75rem",
                    display: "block",
                  }}
                >
                  {isSelected ? "Active conversation" : "Tap to open chat"}
                </Typography>
              </Box>
            </ListItemButton>
          );
        })}

        {filteredUsers.length === 0 && (
          <Box sx={{ p: 3, textAlign: "center", color: "#64748b" }}>
            <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
              No conversations found.
            </Typography>
          </Box>
        )}
      </List>
    </Box>
  );
}

export default Chats;
