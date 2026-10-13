import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import Background from "../Background/Background";
import WifiOffRoundedIcon from "@mui/icons-material/WifiOffRounded";

function OfflineContent() {
  const [open, setOpen] = React.useState(true);

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Background />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.7)",
            padding: 2,
            maxWidth: "460px",
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, pb: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "12px",
              bgcolor: "rgba(239, 68, 68, 0.15)",
              color: "#f87171",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WifiOffRoundedIcon />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#ffffff" }}>
            You are currently offline
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "#94a3b8", lineHeight: 1.6 }}>
            It looks like your internet connection dropped. Whispr requires an active network to sync messages in real time. Please reconnect to continue chatting.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ pt: 1, pr: 2 }}>
          <Button
            onClick={() => window.location.reload()}
            variant="contained"
            sx={{
              borderRadius: "10px",
              backgroundColor: "#4f46e5",
              "&:hover": {
                backgroundColor: "#4338ca",
              },
            }}
          >
            Retry Connection
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default OfflineContent;
