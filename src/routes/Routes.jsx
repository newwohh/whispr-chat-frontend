import React from "react";
import { Route, Routes as Router, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Landing from "../pages/Landing";
import Chat from "../pages/Chat";
import jwt_decode from "jwt-decode";
import { AnimatePresence } from "framer-motion";
import { ChatsContext } from "../context/ChatContext";
import { getToken } from "../handlers/setLocalStorage";

function Routes() {
  const location = useLocation();
  let { ...user } = JSON.parse(localStorage.getItem("user"));
  let token = user.token.refresh;
  let userone = jwt_decode(token);
  console.log(user, userone);

  return (
    <AnimatePresence>
      <ChatsContext.Provider value={{ user }}>
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
