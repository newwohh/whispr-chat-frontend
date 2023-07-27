import React from "react";
import { Route, Routes as Router, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Landing from "../pages/Landing";
import Chat from "../pages/Chat";
import { AnimatePresence } from "framer-motion";
import { ChatsContext } from "../context/ChatContext";

function Routes() {
  const location = useLocation();
  const [user, setUser] = React.useState("");
  return (
    <AnimatePresence>
      <ChatsContext.Provider value={{ user, setUser }}>
        <Router location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<Chat />} />
        </Router>
      </ChatsContext.Provider>
    </AnimatePresence>
  );
}

export default Routes;
