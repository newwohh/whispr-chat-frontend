import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4f46e5",
      light: "#6366f1",
      dark: "#4338ca",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6366f1",
      contrastText: "#ffffff",
    },
    background: {
      default: "#0b0f19",
      paper: "#131926",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#94a3b8",
    },
    divider: "rgba(255, 255, 255, 0.08)",
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
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "9px 18px",
          fontWeight: 600,
          boxShadow: "none",
          transition: "all 0.15s ease",
          "&:hover": {
            boxShadow: "none",
            transform: "none",
          },
        },
        containedPrimary: {
          backgroundColor: "#4f46e5",
          "&:hover": {
            backgroundColor: "#4338ca",
          },
        },
        outlined: {
          borderColor: "rgba(255, 255, 255, 0.15)",
          color: "#f8fafc",
          "&:hover": {
            borderColor: "rgba(255, 255, 255, 0.35)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            backgroundColor: "rgba(19, 25, 38, 0.7)",
            backdropFilter: "blur(12px)",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.1)",
              transition: "border-color 0.15s ease",
            },
            "&:hover fieldset": {
              borderColor: "rgba(255, 255, 255, 0.25)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4f46e5",
              borderWidth: "1.5px",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#94a3b8",
            "&.Mui-focused": {
              color: "#6366f1",
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
