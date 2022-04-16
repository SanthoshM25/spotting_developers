import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogIn from "./screens/authentication/Login";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import UserDetails from "./screens/userDetails/UserDetails";
import ProfileCard from "./screens/userProfile/ProfileCard";
import "antd/dist/antd.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/authentication" element={<LogIn />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/user" element={<ProfileCard />} />
      </Routes>
    </BrowserRouter>
    // <UserDetails />
  );
}

export default App;
