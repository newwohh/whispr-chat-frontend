import { makeStyles } from "@mui/styles";

const useLoginStyles = makeStyles({
  logininputcontainer: {
    padding: "50px",
    width: "500px",
    height: "450px",
    backgroundColor: "white",
    borderRadius: "40px",
  },
  btnlogin: {
    marginTop: "20px",
    marginBottom: "20px",
    width: "160px",
    height: "40px",
    borderRadius: "20px",
    color: "white",
    backgroundImage:
      "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);",
  },
});

export default useLoginStyles;
