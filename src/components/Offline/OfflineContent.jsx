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
    <Box sx={{ width: "100%", height: "100vh", backgroundColor: "#000000" }}>
      <Background />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: "14px",
            backgroundColor: "#0e0e11",
            border: "1px solid rgba(255, 255, 255, 0.15)",
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
              borderRadius: "8px",
              bgcolor: "rgba(255, 255, 255, 0.08)",
              color: "#ffffff",
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
          <Typography variant="body2" sx={{ color: "#a1a1aa", lineHeight: 1.6 }}>
            It looks like your internet connection dropped. Whispr requires an active network to sync messages in real time. Please reconnect to continue chatting.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ pt: 1, pr: 2 }}>
          <Button
            onClick={() => window.location.reload()}
            variant="contained"
            sx={{
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              color: "#000000",
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "#e4e4e7",
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
