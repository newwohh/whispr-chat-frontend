export const backendBaseUrl =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export const backendWsUrl =
  process.env.REACT_APP_WS_URL ||
  (backendBaseUrl.startsWith("https://")
    ? backendBaseUrl.replace("https://", "wss://")
    : backendBaseUrl.replace("http://", "ws://"));
