import { makeStyles } from "@mui/styles";

const useSendMessageStyles = makeStyles({
  sendmessagecontainer: {
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid transparent",
    height: "600px",
    backgroundColor: "#F0F8FF",
    borderRadius: "20px",
    width: "950px",
    marginBottom: "20px",
    overflow: "scroll",
  },
  recieverclass: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    border: "1px solid transparent",
    height: "500px",
    width: "330px",
    overflow: "scroll",
  },
  senderclass: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "end",
    border: "1px solid transparent",
    height: "600px",
    width: "330px",
  },
});

export default useSendMessageStyles;
