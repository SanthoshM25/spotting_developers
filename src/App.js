import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogIn from "./screens/authentication/Login";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import UserDetails from "./screens/userDetails/UserDetails";
import ProfileCard from "./screens/userProfile/ProfileCard";
import "antd/dist/antd.css";
import SearchScreen from "./screens/searchScreen/SearchScreen";
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
        </Routes>
      </BrowserRouter>
    </div>
    // <UserDetails />
  );
}

export default App;
