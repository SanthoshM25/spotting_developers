import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogIn from "./screens/authentication/Login";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import UserDetails from "./screens/userDetails/UserDetails";
import ProfileCard from "./screens/userProfile/ProfileCard";
import "antd/dist/antd.css";
import SearchScreen from "./screens/searchScreen/SearchScreen";
import ParticularUserScreen from "./screens/homeScreen/ParticularUserScreen";
import MessageScreen from "./screens/messagingScreen/Message";
import Chat from "./screens/messagingScreen/Chat";

function App() {
  return (
    <div style={{ backgroundColor: "#F3F1F5", minHeight: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/authentication" element={<LogIn />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/account" element={<ProfileCard />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/messages" element={<MessageScreen />} />
          <Route path="/user/:id" element={<ParticularUserScreen />} />
          <Route path="/chat/:name/:id" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
    // <UserDetails />
  );
}

export default App;
