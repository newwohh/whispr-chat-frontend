import React, { useState } from "react";
import { Route, Routes as Router, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Landing from "../pages/Landing";
import Chat from "../pages/Chat";
import { AnimatePresence } from "framer-motion";
import { ChatsContext } from "../context/ChatContext";
import { UserContext } from "../context/UserContext";
import WorldChat from "../pages/WorldChat";
import { Online, Offline } from "react-detect-offline";
import OfflineContent from "../components/Offline/OfflineContent";

function Routes() {
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    selectedUid: "",
  });
  const location = useLocation();
  let { ...user } = JSON.parse(localStorage.getItem("user") === null)
    ? "please log in"
    : JSON.parse(localStorage.getItem("user"));
  // let token = user === undefined ? "none" : user.token.refresh;
  // let userone = jwt_decode(token);
  console.log(user);

  return (
    <React.Fragment>
      {/* <Online> */}
      <AnimatePresence>
        <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
          <ChatsContext.Provider value={{ user }}>
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
      {/* </Online> */}
      {/* <Offline>{<OfflineContent />}</Offline> */}
    </React.Fragment>
  );
}

export default Routes;
