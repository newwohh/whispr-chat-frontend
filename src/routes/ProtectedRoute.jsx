import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ChatsContext } from "../context/ChatContext";

export const isUserAuthenticated = (user) => {
  if (!user || typeof user !== "object") return false;
  return Boolean(
    user.token ||
      user.user?.id ||
      user.user?.name ||
      user.user?.email ||
      user.id ||
      user.email ||
      user.name
  );
};

export const hasStoredUser = () => {
  try {
    const raw = localStorage.getItem("user");
    if (raw && raw !== "undefined" && raw !== "null") {
      const parsed = JSON.parse(raw);
      return isUserAuthenticated(parsed);
    }
  } catch (err) {
    console.error("Failed to check stored user in localStorage:", err);
  }
  return false;
};

export default function ProtectedRoute({ children }) {
  const { user } = useContext(ChatsContext);
  const location = useLocation();

  const authenticated = isUserAuthenticated(user) || hasStoredUser();

  if (!authenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
