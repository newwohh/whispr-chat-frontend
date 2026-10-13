import React, { useState, useEffect } from "react";
import { Route, Routes as Router, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Landing from "../pages/Landing";
import Chat from "../pages/Chat";
import { AnimatePresence } from "framer-motion";
import { ChatsContext } from "../context/ChatContext";
import { UserContext } from "../context/UserContext";
import WorldChat from "../pages/WorldChat";

const getInitialUser = () => {
  try {
    const raw = localStorage.getItem("user");
    if (raw && raw !== "undefined" && raw !== "null") {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
  }
  return {
    user: {
      name: "DemoUser",
      id: "demo-user-1",
      email: "demo@whispr.io",
    },
    users: [
      { name: "Sarah Connor", id: "101" },
      { name: "Alex Rivera", id: "102" },
      { name: "Elena Rostova", id: "103" },
      { name: "Marcus Vance", id: "104" },
    ],
  };
};

function Routes() {
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    selectedUid: "",
  });
  const [user, setUser] = useState(getInitialUser);
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getInitialUser());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
        <ChatsContext.Provider value={{ user, setUser }}>
          <Router location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/worldchat" element={<WorldChat />} />
          </Router>
        </ChatsContext.Provider>
      </UserContext.Provider>
    </AnimatePresence>
  );
}

export default Routes;
