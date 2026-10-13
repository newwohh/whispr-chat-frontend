import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
      light: "#f4f4f5",
      dark: "#e4e4e7",
      contrastText: "#000000",
    },
    secondary: {
      main: "#a1a1aa",
      contrastText: "#000000",
    },
    background: {
      default: "#000000",
      paper: "#0e0e11",
    },
    text: {
      primary: "#ffffff",
      secondary: "#a1a1aa",
    },
    divider: "rgba(255, 255, 255, 0.1)",
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.025em",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.015em",
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "9px 18px",
          fontWeight: 600,
          boxShadow: "none",
          transition: "all 0.15s ease",
          "&:hover": {
            boxShadow: "none",
          },
        },
        containedPrimary: {
          backgroundColor: "#ffffff",
          color: "#000000",
          "&:hover": {
            backgroundColor: "#e4e4e7",
          },
        },
        outlined: {
          borderColor: "rgba(255, 255, 255, 0.2)",
          color: "#ffffff",
          "&:hover": {
            borderColor: "rgba(255, 255, 255, 0.5)",
            backgroundColor: "rgba(255, 255, 255, 0.06)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.12)",
              transition: "border-color 0.15s ease",
            },
            "&:hover fieldset": {
              borderColor: "rgba(255, 255, 255, 0.3)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ffffff",
              borderWidth: "1.5px",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#a1a1aa",
            "&.Mui-focused": {
              color: "#ffffff",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});
