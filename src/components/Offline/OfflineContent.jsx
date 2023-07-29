import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import Background from "../Background/Background";

function OfflineContent() {
  let open = true;
  return (
    <div>
      <Background />
      <Dialog
        open={open}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Looke like you're offline"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Hello, We're sorry, but it looks like you're currently offline.
            Please ensure you have a stable internet connection to access our
            services. If you have any urgent inquiries or need assistance, feel
            free to send us an email at{" "}
            <a href="nevoznvx@gmail.com">nevoznvx@gmail.com</a> or reach out to
            us once you're back online. Thank you for using our services, and we
            look forward to connecting with you again soon.
            <br /> Best regards <br />
            <br />
            Whispr team"
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}

export default OfflineContent;
