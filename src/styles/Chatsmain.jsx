import { makeStyles } from "@mui/styles";

const useChatsMain = makeStyles({
  chatmaincon: {
    display: "flex",
    padding: "50px",
    width: "1400px",
    height: "700px",
    backgroundColor: "white",
    borderRadius: "40px",
    overflow: "auto",
  },
  chatmainsub: {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    marginRight: "15px",
    overflow: "auto",
  },
  chatmainsubtwo: {
    width: "950px",
    border: "1px solid transparent",
    marginLeft: "10px",
  },
});

export default useChatsMain;
